"use client";

import { useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCarMakes } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";


export default function CarManufacturersClient({ initialData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 500)
  const observer = useRef<IntersectionObserver | null>(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ["car_makesnow", debouncedSearch],
    queryFn: async ({ pageParam }) => {
      console.log(pageParam);
      const response = await getCarMakes({
        cursor: pageParam as string | null,
        search: debouncedSearch,
        limit: 20
      });
      
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch car makes");
      }
      
      return response.data;
    },
    initialPageParam: null as string | null,
    initialData: {
      pages: [initialData.data],
      pageParams: [null],
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  
  
  // Intersection observer for infinite scrolling
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isFetchingNextPage) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  
  // Flatten all manufacturers from all pages
  const allManufacturers = useMemo(
    () => data?.pages.flatMap((page) => page) || [],
    [data?.pages]
  );

  console.log("my data")
  console.log(allManufacturers)
  
  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search car manufacturer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </div>
      </div>
      
      {/* Manufacturers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {allManufacturers.map((make, index) => {
          // Check if this is the last item to add the ref
          const isLastItem = index === allManufacturers.length - 1;
          
          return (
            <div
              key={`${make.$id}-${index}`}
              ref={isLastItem ? lastElementRef : undefined}
            >
              <Link
                href={`/manufacturers/${make.slug}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 relative flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={make.image}
                    alt={`${make.name} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-black transition-colors">
                  {make.name}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      
      {/* Loading indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )}
      
      {/* Empty state */}
      {allManufacturers.length === 0 && !isLoading && (
        <div className="text-center py-16 px-4">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No manufacturers found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search criteria or browse all manufacturers.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
            }}
          >
            Clear search
          </Button>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="text-center py-8 px-4">
          <p className="text-red-500">
            Error loading manufacturers. Please try again.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}