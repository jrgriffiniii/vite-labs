import { beforeEach, describe, expect, it } from "vitest";

import "../src/my-element";

describe("MyElement", async () => {
  beforeEach(() => {
    document.body.innerHTML = "<my-element></my-element>";
  });

  it("should render the default count value", () => {
    expect(
      document.body.querySelector("my-element")?.shadowRoot?.innerHTML,
    ).toContain("count is ");
  });
});
