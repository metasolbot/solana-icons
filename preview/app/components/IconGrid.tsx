'use client';

import { useState } from 'react';

interface Icon {
  name: string;
  category: string;
  svg: string;
  path: string;
}

export function IconGrid({ icons }: { icons: Icon[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (svg: string, name: string) => {
    await navigator.clipboard.writeText(svg);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {icons.map((icon) => (
        <button
          key={icon.path}
          onClick={() => copyToClipboard(icon.svg, icon.name)}
          className="group relative bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-6 transition-all duration-200 hover:scale-105 border border-gray-700/50 hover:border-purple-500/50"
        >
          <div 
            className="w-12 h-12 mx-auto mb-3"
            dangerouslySetInnerHTML={{ __html: icon.svg }}
          />
          <p className="text-xs text-gray-300 group-hover:text-white transition truncate">
            {icon.name}
          </p>
          
          {copied === icon.name && (
            <div className="absolute inset-0 flex items-center justify-center bg-purple-600/90 rounded-lg">
              <span className="text-white text-sm font-medium">✓ Copied!</span>
            </div>
          )}
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
}
