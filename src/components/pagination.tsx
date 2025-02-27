"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  className?: string;
}

export function Pagination({ totalPages, currentPage = 1, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className={cn("flex justify-center items-center gap-2", className)}>
      <Button 
        variant="outline" 
        size="icon" 
        className="h-9 w-9 border-gray-300"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          className={cn(
            "h-9 w-9",
            currentPage === page ? "bg-gray-950 text-gray-50" : "border-gray-300"
          )}
        >
          {page}
        </Button>
      ))}
      
      <Button 
        variant="outline" 
        size="icon" 
        className="h-9 w-9 border-gray-300"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}