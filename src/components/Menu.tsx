import Link from "next/link";
import  Image from "next/image";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Analytics",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
  
      {
        icon: "/lesson.png",
        label: "Uploads",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      
 
  
   
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/student.png",
        label: "Team",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },

      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
  <div className="flex flex-col mt-4 text-sm h-[90%] justify-between">

    {menuItems.map(
      i => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
          {i.items.map (
            item => (
              <Link href={item.href} key={item.label}  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2">
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            )
          )}
        </div>
      )
    )}
  </div>)
}

export default Menu