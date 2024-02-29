import clsx from "clsx";
import {
  Alien,
  CaretRight,
  MaskHappy,
  ShieldStar,
  SignIn,
  SketchLogo,
  Skull,
  TiktokLogo,
} from "phosphor-react";
import { useState } from "react";
import { EPositionItemMenu } from "../../types/Navigation";
// import { useAuth } from "../../contexts/AuthContext"
import { getMenuByPosition } from "../../util/helpers/ui";
import { LogoElement, SidebarElement, TextElement } from "../atoms";
import logo from "../../../assets/img/logo-v1.png";
import { useAuth } from "../../context/AuthContext";
import { GiChameleonGlyph } from "react-icons/gi";

export interface SideMenuProps {}

export const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const middleNav = getMenuByPosition(EPositionItemMenu.MIDDLE);
  const bottomNav = getMenuByPosition(EPositionItemMenu.BOTTOM).sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const { logout } = useAuth();
  return (
    <SidebarElement.Root open={open}>
      <SidebarElement.Nav open={open}>
        <CaretRight
          className={clsx(
            "absolute cursor-pointer -right-3 top-5  bg-primary text-menuTextActtive border-2 border-menuTextActtive rounded-full",
            {
              "rotate-180": open,
            }
          )}
          weight="bold"
          size={25}
          onClick={() => setOpen(!open)}
        />
        <SidebarElement.NavSection open={open} className="flex items-center">
          <SidebarElement.NavSectionItem
            open={open}
            className={clsx(
              {
                "bg-transparent hover:bg-transparent": open,
              },
              " bg-primary hover:bg-primary/80"
            )}
            icon={
              <LogoElement
                className={clsx("cursor-pointer duration-500  ", {
                  "rotate-[360deg] bg-transparent text-primary": open,
                  "text-menuTextActtive": !open,
                })}
              >
                {/* <SketchLogo /> */}
                {/* <Skull /> */}
                {/* <MaskHappy size={32} /> */}
                <GiChameleonGlyph size={32} />
                {/* <ShieldStar /> */}
                {/* <img className="" src={logo} alt="" /> */}
              </LogoElement>
            }
            label={
              <TextElement
                size="sm"
                className={clsx(
                  "text-title origin-left text-sm duration-200 bg-transparent font-semibold",
                  {
                    "scale-0 ": !open,
                    "hover:text-title/80": open,
                  }
                )}
              >
                FLEXI CONTROL
              </TextElement>
            }
          />
        </SidebarElement.NavSection>

        <SidebarElement.NavSection open={open}>
          {/* <TextInput.Root>
                <TextInput.Icon>
                  <Envelope className="cursor-pointer" onClick={() => setOpen(!open)}/>
                </TextInput.Icon>
                <TextInput.Input placeholder= "Pesquisar" />
              </TextInput.Root> */}
          {middleNav.map((item) => (
            <SidebarElement.NavSectionItemRoute
              key={item.id}
              open={open}
              itemMenu={item}
            />
          ))}
        </SidebarElement.NavSection>

        <SidebarElement.NavSection open={open}>
          {bottomNav.map((item) => (
            <SidebarElement.NavSectionItemRoute
              key={item.id}
              open={open}
              itemMenu={item}
            />
          ))}
          <SidebarElement.NavSectionItemRoute
            key={25}
            open={open}
            itemMenu={{
              id: 4,
              route: "/login",
              name: "logout",
              label: "Sair",
              position: EPositionItemMenu.BOTTOM,
              order: 6,
              icon: <SignIn />,
              private: false,
            }}
            onClick={logout}
          />
        </SidebarElement.NavSection>
      </SidebarElement.Nav>
    </SidebarElement.Root>
  );
};
