import fs from 'fs';
import path from 'path';
import { IconGrid } from './components/IconGrid';

interface Icon {
  name: string;
  category: string;
  svg: string;
  path: string;
}

async function getIcons(): Promise<Icon[]> {
  const svgDir = path.join(process.cwd(), 'public', 'svg');
  const icons: Icon[] = [];
  
  const categories = fs.readdirSync(svgDir).filter(item => {
    const itemPath = path.join(svgDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const category of categories) {
    const categoryPath = path.join(svgDir, category);
    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.svg'));
    
    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const svg = fs.readFileSync(filePath, 'utf-8');
      icons.push({
        name: file.replace('.svg', ''),
        category,
        svg,
        path: `svg/${category}/${file}`
      });
    }
  }

  return icons;
}

export default async function Home() {
  const icons = await getIcons();
  const categories = Array.from(new Set(icons.map(i => i.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Solana Icons
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Open-source icon library for the Solana ecosystem
          </p>
          <p className="text-gray-400 mb-6">
            {icons.length} icons across {categories.length} categories
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="https://github.com/metasolbot/solana-icons" 
              target="_blank"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
              GitHub
            </a>
            <a 
              href="https://github.com/metasolbot/solana-icons/blob/main/CONTRIBUTING.md" 
              target="_blank"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
            >
              Contribute
            </a>
          </div>
        </div>

        {categories.map(category => {
          const categoryIcons = icons.filter(i => i.category === category);
          return (
            <div key={category} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white capitalize flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded"></span>
                {category}
                <span className="text-sm text-gray-400 font-normal">({categoryIcons.length})</span>
              </h2>
              <IconGrid icons={categoryIcons} />
            </div>
          );
        })}

        <div className="text-center mt-16 text-gray-400 text-sm">
          <p>Made for the Solana ecosystem • MIT License</p>
          <p className="mt-2">
            <a href="https://github.com/metasolbot/solana-icons/issues" target="_blank" className="hover:text-purple-400 transition">
              Request an icon
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
