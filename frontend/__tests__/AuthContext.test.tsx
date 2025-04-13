import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth, AuthProvider } from "../src/app/context/AuthContext";
import axios from "axios";

jest.mock("axios");

describe("AuthContext", () => {
  it("signs up a user", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { user: { id: 1, username: "testuser" }, token: "token123" },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signup("testuser", "test123");
    });

    expect(result.current.user).toEqual({ id: 1, username: "testuser" });
    expect(result.current.token).toEqual("token123");
  });

  it("logs out a user", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
});