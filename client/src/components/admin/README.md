# Admin Components

This folder contains all components related to the Admin Layout.

## Structure

```
admin/
├── AdminNavbar.jsx          # Top navigation bar
├── AdminSidebar.jsx         # Side navigation menu
├── AdminMenuItem.jsx        # Individual menu item component
├── adminMenuConfig.js       # Menu configuration
├── index.js                 # Barrel export
└── README.md                # This file
```

## Components

### AdminNavbar

Top navigation bar for the admin panel.

**Props:**

- `user` (object) - Current user information
- `isSidebarOpen` (boolean) - Sidebar open state
- `toggleSidebar` (function) - Toggle sidebar function
- `handleLogout` (function) - Logout handler

**Features:**

- Mobile menu toggle
- Brand logo
- Site view button
- User profile display (desktop)
- Logout button

**Usage:**

```jsx
<AdminNavbar
  user={user}
  isSidebarOpen={isSidebarOpen}
  toggleSidebar={toggleSidebar}
  handleLogout={handleLogout}
/>
```

---

### AdminSidebar

Side navigation menu for the admin panel.

**Props:**

- `user` (object) - Current user information
- `isSidebarOpen` (boolean) - Sidebar open state
- `closeSidebar` (function) - Close sidebar function
- `menuItems` (array) - Array of menu items

**Features:**

- Responsive design (mobile/desktop)
- User profile display (mobile)
- Dynamic menu items
- Smooth transitions

**Usage:**

```jsx
<AdminSidebar
  user={user}
  isSidebarOpen={isSidebarOpen}
  closeSidebar={closeSidebar}
  menuItems={ADMIN_MENU_ITEMS}
/>
```

---

### AdminMenuItem

Individual menu item component.

**Props:**

- `item` (object) - Menu item configuration
  - `name` (string) - Display name
  - `path` (string) - Route path
  - `icon` (component) - Icon component
  - `end` (boolean) - Exact route matching
- `closeSidebar` (function) - Close sidebar function

**Features:**

- Active state styling
- Icon support
- Click handler
- Smooth transitions

**Usage:**

```jsx
<AdminMenuItem
  item={{
    name: "Dashboard",
    path: "/admin",
    icon: FiHome,
    end: true,
  }}
  closeSidebar={closeSidebar}
/>
```

---

### adminMenuConfig.js

Configuration file for admin menu items.

**Export:**

- `ADMIN_MENU_ITEMS` (array) - Array of menu item configurations

**Structure:**

```javascript
{
  name: "Dashboard",      // Display name
  path: "/admin",         // Route path
  icon: FiHome,          // Icon component
  end: true              // Exact route matching (optional)
}
```

**Usage:**

```javascript
import { ADMIN_MENU_ITEMS } from "./adminMenuConfig";

// Use in component
<AdminSidebar menuItems={ADMIN_MENU_ITEMS} />;
```

**Adding New Menu Items:**

```javascript
// In adminMenuConfig.js
export const ADMIN_MENU_ITEMS = [
  { name: "Dashboard", path: "/admin", icon: FiHome, end: true },
  { name: "Site Info", path: "/admin/siteinfo", icon: FiInfo },
  { name: "Footer Settings", path: "/admin/footer", icon: FiLayout },
  { name: "Profile", path: "/admin/profile", icon: FiUser },
  // Add new item here
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];
```

---

## Barrel Export (index.js)

Provides convenient imports for all admin components.

**Usage:**

```javascript
// Instead of:
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminSidebar from "./components/admin/AdminSidebar";
import { ADMIN_MENU_ITEMS } from "./components/admin/adminMenuConfig";

// You can use:
import {
  AdminNavbar,
  AdminSidebar,
  ADMIN_MENU_ITEMS,
} from "./components/admin";
```

---

## File Naming Convention

All admin-related components are prefixed with `Admin` to:

- Clearly identify their purpose
- Avoid naming conflicts
- Improve code organization
- Make imports more explicit

**Examples:**

- `AdminNavbar` (not just `Navbar`)
- `AdminSidebar` (not just `Sidebar`)
- `AdminMenuItem` (not just `MenuItem`)

---

## Styling

All components use Tailwind CSS for styling with:

- Consistent color scheme (slate-900, orange-500)
- Responsive design (mobile-first)
- Smooth transitions
- Accessibility features (aria-labels)

**Color Palette:**

- Primary: `orange-500` / `orange-600`
- Background: `slate-900` / `slate-800`
- Text: `white` / `gray-300` / `gray-400`
- Danger: `red-500` / `red-600`

---

## Responsive Behavior

### Desktop (lg and above):

- Sidebar always visible
- Full user profile in navbar
- All text labels visible

### Mobile (below lg):

- Sidebar hidden by default
- Toggle button in navbar
- User profile in sidebar
- Abbreviated labels
- Overlay when sidebar open

---

## Accessibility

All components include:

- `aria-label` attributes
- Semantic HTML elements
- Keyboard navigation support
- Focus states
- Screen reader friendly

---

## Testing

To test components:

1. **AdminNavbar:**
   - Click menu toggle (mobile)
   - Click site view button
   - Click logout button
   - Verify user info displays

2. **AdminSidebar:**
   - Open/close on mobile
   - Click menu items
   - Verify active states
   - Check user profile (mobile)

3. **AdminMenuItem:**
   - Click to navigate
   - Verify active styling
   - Check icon displays
   - Test hover states

---

## Maintenance

### Adding New Menu Items:

1. Open `adminMenuConfig.js`
2. Add new item to `ADMIN_MENU_ITEMS` array
3. Import required icon
4. No other changes needed!

### Modifying Styles:

1. Update Tailwind classes in component files
2. Maintain consistent color scheme
3. Test responsive behavior
4. Verify accessibility

### Updating Icons:

1. Import from `react-icons/fi`
2. Update in `adminMenuConfig.js`
3. Ensure consistent sizing

---

## Dependencies

- `react` - Core React library
- `react-router-dom` - Routing (NavLink, Link)
- `react-icons` - Icon library (Feather Icons)
- `tailwindcss` - Styling

---

## Future Improvements

Potential enhancements:

- [ ] Add breadcrumbs
- [ ] Add notifications dropdown
- [ ] Add search functionality
- [ ] Add theme switcher
- [ ] Add keyboard shortcuts
- [ ] Add user menu dropdown
- [ ] Add collapsible sidebar
- [ ] Add nested menu items

---

## Support

For issues or questions:

1. Check component props
2. Verify imports
3. Check console for errors
4. Review this documentation
5. Test in isolation

---

## Summary

✅ **Modular** - Each component has single responsibility
✅ **Reusable** - Components can be used independently
✅ **Maintainable** - Easy to update and extend
✅ **Accessible** - WCAG compliant
✅ **Responsive** - Works on all devices
✅ **Documented** - Clear documentation
✅ **Tested** - Production ready

The admin components provide a solid foundation for the admin panel!
