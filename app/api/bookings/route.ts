import { NextResponse, type NextRequest } from "next/server";
import { bookingRequestSchema } from "@/lib/validation";
import { createBooking, BookingError } from "@/lib/booking";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const limit = checkRateLimit(`book:${ip}`, 10, 60_000);
  if (!limit.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", issues: parsed.error.issues }, { status: 400 });
  }

  try {
    const booking = await createBooking({
      slug: parsed.data.slug,
      startUtc: new Date(parsed.data.startUtc),
      guestName: parsed.data.guestName,
      guestEmail: parsed.data.guestEmail,
      guestTimezone: parsed.data.guestTimezone,
      customAnswers: parsed.data.customAnswers,
    });
    return NextResponse.json({ token: booking.manageToken });
  } catch (err) {
    if (err instanceof BookingError) {
      const status = err.code === "slot_taken" ? 409 : err.code === "not_found" ? 404 : err.code === "calendar" ? 503 : 400;
      return NextResponse.json({ error: err.code, message: err.message }, { status });
    }
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
