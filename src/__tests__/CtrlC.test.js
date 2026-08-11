import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CtrlC from "../components/CtrlC.vue";

describe("CtrlC", () => {
  let clipboardWriteText;

  beforeEach(() => {
    clipboardWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: clipboardWriteText },
      writable: true,
      configurable: true,
    });
  });

  it("renders slot content", () => {
    const wrapper = mount(CtrlC, {
      slots: { default: '<input type="text" value="hello" />' },
    });
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("renders the default copy icon", () => {
    const wrapper = mount(CtrlC, {
      slots: { default: '<input type="text" />' },
    });
    expect(wrapper.text()).toContain("📋");
  });

  it("renders a custom copy icon via prop", () => {
    const wrapper = mount(CtrlC, {
      props: { copyIcon: "📃" },
      slots: { default: '<input type="text" />' },
    });
    expect(wrapper.text()).toContain("📃");
  });

  it("copies input value to clipboard on icon click", async () => {
    const wrapper = mount(CtrlC, {
      slots: { default: '<input type="text" value="test value" />' },
    });
    await wrapper.find(".ctrl-c-icon-button").trigger("click");
    expect(clipboardWriteText).toHaveBeenCalledWith("test value");
  });

  it("emits copy-success on successful copy", async () => {
    const wrapper = mount(CtrlC, {
      slots: { default: '<input type="text" value="success" />' },
    });
    await wrapper.find(".ctrl-c-icon-button").trigger("click");
    expect(wrapper.emitted("copy-success")).toBeTruthy();
    expect(wrapper.emitted("copy-success")[0]).toEqual(["success"]);
  });

  it("emits copy-error when clipboard fails", async () => {
    clipboardWriteText.mockRejectedValueOnce(new Error("denied"));
    const wrapper = mount(CtrlC, {
      slots: { default: '<input type="text" value="fail" />' },
    });
    await wrapper.find(".ctrl-c-icon-button").trigger("click");
    expect(wrapper.emitted("copy-error")).toBeTruthy();
    expect(wrapper.emitted("copy-error")[0][0]).toBeInstanceOf(Error);
  });

  it("copies from text prop when provided", async () => {
    const wrapper = mount(CtrlC, {
      props: { text: "custom text" },
      slots: { default: '<button>Copy</button>' },
    });
    await wrapper.find(".ctrl-c-icon-button").trigger("click");
    expect(clipboardWriteText).toHaveBeenCalledWith("custom text");
  });

  it("shows checkmark after successful copy", async () => {
    vi.useFakeTimers();
    const wrapper = mount(CtrlC, {
      slots: { default: '<input type="text" value="x" />' },
    });
    await wrapper.find(".ctrl-c-icon-button").trigger("click");
    expect(wrapper.text()).toContain("✅");
    vi.advanceTimersByTime(2500);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("📋");
    vi.useRealTimers();
  });

  it("triggers copy on Enter keydown", async () => {
    const wrapper = mount(CtrlC, {
      slots: { default: '<input type="text" value="keyboard" />' },
    });
    await wrapper.find(".ctrl-c-icon-button").trigger("keydown.enter");
    expect(clipboardWriteText).toHaveBeenCalledWith("keyboard");
  });

  it("works with textarea elements", async () => {
    const wrapper = mount(CtrlC, {
      slots: { default: '<textarea>textarea content</textarea>' },
    });
    await wrapper.find(".ctrl-c-icon-button").trigger("click");
    expect(clipboardWriteText).toHaveBeenCalledWith("textarea content");
  });

  it("shows icon always when showIcon prop is true", () => {
    const wrapper = mount(CtrlC, {
      props: { showIcon: true },
      slots: { default: '<input type="text" />' },
    });
    expect(wrapper.find(".ctrl-c-show-icon").exists()).toBe(true);
  });

  it("falls back to execCommand when clipboard API missing", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      writable: true,
      configurable: true,
    });
    document.execCommand = vi.fn().mockReturnValue(true);

    const wrapper = mount(CtrlC, {
      slots: { default: '<input type="text" value="fallback" />' },
    });
    await wrapper.find(".ctrl-c-icon-button").trigger("click");
    expect(wrapper.emitted("copy-success")).toBeTruthy();
  });
});
