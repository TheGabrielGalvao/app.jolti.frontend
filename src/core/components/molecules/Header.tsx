import { ProfileMenu } from "./ProfileMenu";

export const Header = () => {
  return (
    <header className="flex w-full px-14 py-4 min-h-[4rem] bg-card items-center justify-between border-b-2 border-b-grey-400">
      <ProfileMenu />
    </header>
  );
};
