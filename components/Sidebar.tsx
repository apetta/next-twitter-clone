import SidebarRow from './SidebarRow'
import {
  BellIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  MailIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'

function Sidebar() {
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <div className="relative m-3 h-10 w-10">
        <Image alt="" layout="fill" src="/twitter-logo.svg" />
      </div>

      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow Icon={UserIcon} title="Sign In" />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}
export default Sidebar
