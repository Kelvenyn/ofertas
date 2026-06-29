### Task 2: Wire ConfigPanel into psicopedagogia page

**Files:**
- Modify: `src/app/psicopedagogia/page.tsx`

**Interfaces:**
- Consumes: `ConfigPanel` from `@/components/dev/ConfigPanel`

- [ ] **Step 1: Replace PaletteSwitcher import with ConfigPanel**

In `src/app/psicopedagogia/page.tsx`, change:
```typescript
import { PaletteSwitcher } from "@/components/dev/PaletteSwitcher"
```
to:
```typescript
import { ConfigPanel } from "@/components/dev/ConfigPanel"
```

- [ ] **Step 2: Replace PaletteSwitcher usage with ConfigPanel**

Change `<PaletteSwitcher />` to `<ConfigPanel />` at the bottom of the JSX.

- [ ] **Step 3: Build to verify**

Run: `cmd.exe /c "npm run build"`
Expected: Compiled successfully, no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/psicopedagogia/page.tsx
git commit -m "feat: replace PaletteSwitcher with ConfigPanel on psicopedagogia page"
```
