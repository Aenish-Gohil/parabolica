const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090";

import { supabase, supabaseAdmin } from "@/lib/supabase";

async function getAuthHeader(): Promise<Record<string, string>> {
    try {
        // Check Admin storage first
        const { data: { session: adminSession }, error: adminError } = await supabaseAdmin.auth.getSession();
        if (adminError) {
            if (adminError.message.includes("Refresh Token Not Found")) await supabaseAdmin.auth.signOut();
        } else if (adminSession) {
            return { Authorization: `Bearer ${adminSession.access_token}` };
        }

        // Check User storage second
        const { data: { session: userSession }, error: userError } = await supabase.auth.getSession();
        if (userError) {
            if (userError.message.includes("Refresh Token Not Found")) await supabase.auth.signOut();
        } else if (userSession) {
            return { Authorization: `Bearer ${userSession.access_token}` };
        }
    } catch (err) {
        console.warn("Auth header extraction failed:", err);
    }

    throw new Error("Not authenticated");
}

async function apiRequest(path: string, options: RequestInit = {}) {
    const authHeaders = await getAuthHeader();
    
    // Add a 45-second timeout since Render free tier can be slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
        const res = await fetch(`${API_BASE}${path}`, {
            ...options,
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                ...authHeaders,
                ...options.headers,
            },
        });
        
        const json = await res.json();
        if (!res.ok) throw new Error(json.detail || "API Error");
        return json;
    } catch (err: any) {
        if (err.name === 'AbortError') {
            throw new Error("MISSION TIMEOUT: Mission Control is taking too long to respond. Please try again.");
        }
        throw err;
    } finally {
        clearTimeout(timeoutId);
    }
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
