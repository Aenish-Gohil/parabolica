const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090";

import { supabase, supabaseAdmin } from "@/lib/supabase";

async function getAuthHeader(): Promise<Record<string, string>> {
    // Check Admin storage first
    const { data: { session: adminSession } } = await supabaseAdmin.auth.getSession();
    if (adminSession) return { Authorization: `Bearer ${adminSession.access_token}` };

    // Check User storage second
    const { data: { session: userSession } } = await supabase.auth.getSession();
    if (userSession) return { Authorization: `Bearer ${userSession.access_token}` };

    throw new Error("Not authenticated");
}

async function apiRequest(path: string, options: RequestInit = {}) {
    const authHeaders = await getAuthHeader();
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...authHeaders,
            ...options.headers,
        },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.detail || "API Error");
    return json;
}

// ─── Booking API ──────────────────────────────────────────────────────────────

export async function createBooking(payload: {
    branch: string;
    booking_date?: string;
    pilot_name: string;
    pilot_phone: string;
    mission_configs: { game_type: string; config: object }[];
}) {
    return apiRequest("/bookings/", { method: "POST", body: JSON.stringify(payload) });
}

export async function getMyBookings() {
    return apiRequest("/bookings/mine");
}

// ─── Inquiry API ──────────────────────────────────────────────────────────────

export async function submitInquiry(payload: {
    event_type: string;
    location: string;
    pilot_name: string;
    pilot_email: string;
    pilot_phone: string;
    message?: string;
}) {
    return apiRequest("/inquiries/", { method: "POST", body: JSON.stringify(payload) });
}

// ─── Admin API ────────────────────────────────────────────────────────────────

export async function verifyAdmin() {
    return apiRequest("/admin/verify");
}

export async function getAdminBookings(branch?: string, date?: string) {
    const params = new URLSearchParams();
    if (branch) params.append("branch", branch);
    if (date) params.append("date", date);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiRequest(`/bookings/${qs}`);
}

export async function getAdminInquiries(branch?: string) {
    const qs = branch ? `?branch=${branch}` : "";
    return apiRequest(`/inquiries/${qs}`);
}

export async function updateBookingStatus(bookingId: string, status: string) {
    return apiRequest(`/bookings/${bookingId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    });
}

export async function updateInquiryStatus(inquiryId: string, status: string) {
    return apiRequest(`/inquiries/${inquiryId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    });
}

export async function getAdminStats(branch?: string) {
    const qs = branch ? `?branch=${branch}` : "";
    return apiRequest(`/admin/stats${qs}`);
}

export async function getPilotRegistry(branch?: string) {
    const qs = branch ? `?branch=${branch}` : "";
    return apiRequest(`/admin/pilots${qs}`);
}

// ─── Slot Availability API ───────────────────────────────────────────────────

export async function getSlotsAvailability(branch: string, gameType: string, date: string) {
    return apiRequest(`/slots/availability?branch=${branch}&game_type=${gameType}&date=${date}`);
}

export async function getAllBookedSlots(branch: string, date: string) {
    return apiRequest(`/slots/all-available?branch=${branch}&date=${date}`);
}
