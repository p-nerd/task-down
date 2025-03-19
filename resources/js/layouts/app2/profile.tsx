import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { TUser } from "@/types/models";

import { useInitials } from "@/hooks/use-initials";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";
import { Link } from "@inertiajs/react";
import { LogOutIcon, SettingsIcon } from "lucide-react";

export const Profile = ({ user }: { user: TUser }) => {
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 rounded-full">
                    <Avatar className="size-8">
                        <AvatarImage src={user.avatar} alt={user?.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserInfo user={user} showEmail={true} />
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={route("profile.edit")}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <SettingsIcon className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        method="post"
                        href={route("logout")}
                        as="button"
                        onClick={cleanup}
                    >
                        <LogOutIcon className="mr-2" />
                        Log out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
