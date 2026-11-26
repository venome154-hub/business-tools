import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  testMatch: "*.spec.ts",
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:3001",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npx next dev -p 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
