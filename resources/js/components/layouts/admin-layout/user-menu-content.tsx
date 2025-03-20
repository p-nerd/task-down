import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type { TUser } from "@/types/models";

import { useMobileNavigation } from "@/hooks/use-mobile-navigation";

import { UserInfo } from "@/components/elements/user-info";
import { Link } from "@inertiajs/react";
import { LogOutIcon, SettingsIcon } from "lucide-react";

export const UserMenuContent = ({ user }: { user: TUser }) => {
    const cleanup = useMobileNavigation();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={route("settings.profile.edit")}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <SettingsIcon className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
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
        </>
    );
};
