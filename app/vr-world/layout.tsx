// This layout intentionally has NO navbar/header so the vr-world page
// renders as a pure fullscreen canvas with zero UI chrome.
export default function VRWorldLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
