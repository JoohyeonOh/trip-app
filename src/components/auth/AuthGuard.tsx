import { userAtom } from "@/atom/user";
import { auth } from "@/remote/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setUser(null);
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? "",
        displayName: user.displayName ?? "",
        photoURL: user.photoURL ?? "",
      });
    }

    setInitialize(true);
  });

  if (!initialize) return null;

  return <>{children}</>;
}

export default AuthGuard;
