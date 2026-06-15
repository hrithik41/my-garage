"use client";

import React, { useState } from "react";
import { mockBlogs, BlogPost } from "@/data/mocData";
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Workshop <span className="text-brand-primary">Tips & Tutorials</span>
        </h1>
        <p className="text-sm text-gray-400 font-medium">
          Professional auto-mechanic advice to keep your vehicle performing at its peak, avoiding premature component wear.
        </p>
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockBlogs.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="glass border border-card-border rounded-2xl bg-card-bg/40 overflow-hidden shadow-lg hover:border-brand-primary/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 overflow-hidden bg-secondary">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-brand-primary/90 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                  {post.category}
                </span>
              </div>

              {/* Text info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-foreground group-hover:text-brand-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA bar */}
            <div className="p-6 pt-0 flex justify-end">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary group-hover:translate-x-1 transition-transform">
                Read Article
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* FULL READ MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass max-w-2xl w-full bg-card-bg border border-card-border rounded-2xl shadow-2xl overflow-hidden relative max-h-[85vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-gray-400 hover:text-white border border-card-border hover:bg-black transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto hide-scrollbar">
                
                {/* Banner Image */}
                <div className="relative h-60 bg-secondary">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <span className="absolute bottom-4 left-6 bg-brand-primary text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                </div>

                {/* Text Content */}
                <div className="p-8 space-y-6">
                  
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedPost.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                    {selectedPost.title}
                  </h2>

                  {/* Body Paragraphs parsing */}
                  <div className="text-xs font-semibold text-gray-300 leading-relaxed space-y-4">
                    {selectedPost.content.split(/\d\.\s/).map((section, idx) => {
                      if (idx === 0) {
                        return <p key={idx}>{section.trim()}</p>;
                      }
                      
                      // Highlight sections/lists
                      return (
                        <div key={idx} className="p-4 bg-background/40 border border-card-border rounded-xl space-y-1">
                          <p className="text-brand-primary font-black text-[10px] uppercase flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Tip #{idx}
                          </p>
                          <p className="text-foreground">{section.trim()}</p>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
