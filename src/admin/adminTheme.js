// Minimalist, modern admin styling — deliberately distinct from the Amazon-style public Store
// theme (../components/store/theme.js). The accent color is runtime-selectable (see
// AdminSettingsContext.jsx, which sets a --admin-accent CSS variable); the site's own brand blue
// (#3b82f6, same default as the desktop's SystemSettingsContext) is only the fallback used where
// that variable isn't set (e.g. the login page).
// Same navy as the login page (and the public Store's header) so the logo — built for a dark
// backdrop — stays visible in the sidebar too.
export const ADMIN_SIDEBAR_BG = 'bg-[#131921]'
export const ADMIN_SIDEBAR_BORDER = 'border-white/10'
export const ADMIN_SIDEBAR_TEXT = 'text-white/70 hover:text-white'
export const ADMIN_SIDEBAR_ACTIVE_BG = 'bg-[var(--admin-accent,#3b82f6)]'
export const ADMIN_SIDEBAR_ACTIVE_TEXT = 'text-white'
export const ADMIN_HEADER_BORDER = 'border-[#E3E3E3]'
export const ADMIN_PAGE_BG = 'bg-[#F6F6F7]'
export const ADMIN_ACCENT_BG = 'bg-[var(--admin-accent,#3b82f6)]'
export const ADMIN_ACCENT_HOVER_BG = 'hover:brightness-90'
export const ADMIN_ACCENT_TEXT = 'text-[var(--admin-accent,#3b82f6)]'
export const ADMIN_ACCENT_SOFT_BG = 'bg-[var(--admin-accent,#3b82f6)]/10'
// Full literal class strings (not composed via template interpolation) so Tailwind's build-time
// scanner can actually see and generate them — a `` `file:${ADMIN_ACCENT_BG}` `` composition at
// the call site never appears as a real class name in source text, so Tailwind silently skips it.
export const ADMIN_ACCENT_FILE_BUTTON_BG =
  'file:bg-[var(--admin-accent,#3b82f6)]'
export const ADMIN_ACCENT_FILE_BUTTON_HOVER = 'hover:file:brightness-90'
export const ADMIN_BODY_TEXT = 'text-[#202223]'
export const ADMIN_SECONDARY_TEXT = 'text-[#6D7175]'
export const ADMIN_CARD_BORDER = 'border-[#E3E3E3]'
// Same navy as the public Store's header (StoreHeader.jsx / STORE_HEADER_BG) — the logo is built
// for this dark backdrop and is illegible on a light one.
export const ADMIN_LOGIN_BG = 'bg-[#131921]'
