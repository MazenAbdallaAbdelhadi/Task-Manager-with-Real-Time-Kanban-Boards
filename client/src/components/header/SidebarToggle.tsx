import { SidebarIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  toggleSidebar: () => void;
}

const SidebarToggle: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <Button size="icon" variant="outline" onClick={toggleSidebar}>
      <SidebarIcon size={18} />
    </Button>
  );
};

export default SidebarToggle;
