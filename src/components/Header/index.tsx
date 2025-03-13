import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";

interface OverlayClickEvent extends React.MouseEvent<HTMLDivElement> {
  target: EventTarget & HTMLDivElement;
  currentTarget: EventTarget & HTMLDivElement;
}

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const { user } = useUser();

  const [search, setSearch] = useSearchParams();

  const handleOverlayClick = (e: OverlayClickEvent) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant={"outline"} onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "student" && (
              <Link to={"/submeter-monografia"}>
                <Button variant={"destructive"} className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Publicar um trabalho
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-20  h-20",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Minha monografia"
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Monografias salvas"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export { Header };
