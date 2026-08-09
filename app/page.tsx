import iconsData from "./icons-data.json";
import { SearchHeader } from "./components/SearchHeader";

interface Icon {
  name: string;
  category: string;
  path: string;
}

export default function Home() {
  const icons = iconsData.icons as Icon[];
  const categories = iconsData.categories as string[];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      <SearchHeader icons={icons} categories={categories} />
    </div>
  );
}
