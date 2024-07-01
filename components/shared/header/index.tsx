import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MenuIcon, SearchIcon } from "lucide-react";
import { getAllCategories } from "@/lib/actions/product.actions";
import Search from "./search";

const Header = async () => {
  const categories = await getAllCategories();

  return (
    <header className="w-full border-b py-3 fixed top-0 z-50 bg-white">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="outline">
                <MenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Select a category</DrawerTitle>
                <div className="space-y-1">
                  {categories.map((category: { name: string }) => (
                    <Button
                      className="w-full justify-start"
                      variant="ghost"
                      key={category.name}
                      asChild
                    >
                      <DrawerClose asChild>
                        <Link href={`/search?category=${category.name}`}>
                          {category.name}
                        </Link>
                      </DrawerClose>
                    </Button>
                  ))}
                </div>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
          <Link href="/" className="flex-start ml-2">
            <Image
              src="/assets/images/logo.webp"
              width={150}
              height={150}
              alt={`${APP_NAME} logo`}
            />
          </Link>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <Menu />
        <div className="md:hidden block">
          <Link href="/search">
            <Button>
              <SearchIcon />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
