import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS } from '../data/destinations';
import { Search, X, MapPin } from 'lucide-react';

interface Props {
  placeholder?: string;
  className?: string;
  showLocationButton?: boolean;
}

export const DestinationSearchInput: React.FC<Props> = ({
  placeholder,
  className = '',
  showLocationButton = true,
}) => {
  const { language, formatPrice, navigateToDestination, openStoreCatalog } = useApp();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return DESTINATIONS.slice(0, 6);
    const q = query.toLowerCase().trim();
    return DESTINATIONS.filter((d) => {
      return (
        d.nameVi.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        (d.coveredCountriesList && d.coveredCountriesList.some((c) => c.toLowerCase().includes(q)))
      );
    }).slice(0, 8);
  }, [query]);

  const handleSelect = (destId: string) => {
    navigateToDestination(destId);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative flex-1 ${className}`}>
      <div className="relative flex items-center bg-white border border-[#E2E8F0] rounded-full p-1 sm:p-1.5 shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-[#1A2340] transition-all">
        <Search className="w-4 h-4 text-[#1A2340]/60 ml-3 mr-2 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (results.length > 0) {
                handleSelect(results[0].id);
              } else {
                openStoreCatalog();
                setIsOpen(false);
              }
            }
          }}
          placeholder={
            placeholder ||
            (language === 'vi'
              ? 'Bạn cần eSIM ở đâu?'
              : 'Where do you need an eSIM?')
          }
          className="w-full bg-transparent border-none text-xs sm:text-sm text-[#1A2340] placeholder-[#1A2340]/60 font-medium focus:outline-none py-1.5 pr-2"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1 mr-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {showLocationButton && (
          <button
            type="button"
            onClick={() => {
              openStoreCatalog();
              setIsOpen(false);
            }}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-[#1A2340] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-2xs transition-all cursor-pointer shrink-0 mr-0.5"
          >
            <MapPin className="w-3 h-3 text-[#1A2340]" />
            <span>{language === 'vi' ? 'Địa điểm' : 'Locations'}</span>
          </button>
        )}
      </div>

      {/* Floating Dropdown Results */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>{query ? (language === 'vi' ? 'Kết quả tìm kiếm' : 'Search Results') : (language === 'vi' ? 'Gợi ý điểm đến' : 'Popular Destinations')}</span>
            <span>{results.length} {language === 'vi' ? 'điểm đến' : 'destinations'}</span>
          </div>

          {results.length > 0 ? (
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
              {results.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => handleSelect(dest.id)}
                  className="px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={`https://flagsapi.com/${dest.flagCode || dest.code || 'JP'}/flat/64.png`}
                      alt={dest.nameVi}
                      className="w-7 h-5 object-contain rounded-xs shrink-0 shadow-2xs"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="truncate">
                      <div className="font-extrabold text-xs sm:text-sm text-[#1A2340] group-hover:text-[#ff7a5c] transition-colors truncate">
                        {language === 'vi' ? dest.nameVi : dest.nameEn}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium truncate">
                        {dest.category === 'regional'
                          ? (language === 'vi' ? `Khu vực (${dest.coveredCountriesCount || 10}+ quốc gia)` : `Region (${dest.coveredCountriesCount || 10}+ countries)`)
                          : (language === 'vi' ? 'eSIM Quốc gia' : 'Local eSIM')}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-[#1A2340]">
                      {language === 'vi' ? 'Từ ' : 'From '}
                      {formatPrice(dest.startingPriceVnd, dest.startingPriceUsd)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              <div>{language === 'vi' ? `Không tìm thấy điểm đến phù hợp với "${query}"` : `No destinations found matching "${query}"`}</div>
              <button
                type="button"
                onClick={() => {
                  openStoreCatalog();
                  setIsOpen(false);
                }}
                className="mt-3 px-4 py-1.5 bg-[#1A2340] text-white text-xs font-bold rounded-full hover:bg-slate-800 transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <span>{language === 'vi' ? 'Xem tất cả cửa hàng' : 'View All Store'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
