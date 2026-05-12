import React from "react";
import blogData from "../../data/blog.json";
import BlogCard from "../../components/BlogCard";
import Hero from "../../components/Hero";
import {
  PAGE_KEYWORDS,
  BASE_KEYWORDS,
  generateKeywords,
} from "../../utils/seoUtils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health & Wellness Blog | Natural Healing Insights",
  description:
    "Explore our archive of health and wellness articles. Dr. Nritiya Dave shares expert insights on chronic disease management, natural immunity, and evidence-based homeopathic treatments.",
  keywords: generateKeywords(BASE_KEYWORDS, [
    ...PAGE_KEYWORDS.blog,
    "homeopathy health tips",
    "natural healing articles",
    "medical wellness blog chennai",
    "psoriasis diet tips",
  ]),
};

const BlogPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-cream-50 overflow-hidden">
      {/* Premium Hero */}
      <Hero title={blogData.title} subtitle={blogData.subtitle} />

      {/* Featured Posts / Grid Section */}
      <section className="py-14 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-terracotta-50/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
            <div className="space-y-2">
              <h2 className="section-kicker">Latest Insights</h2>
              <h3 className="section-heading">
                Educational{" "}
                <span className="text-terracotta-600">Guidance</span>.
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["All Topics", "Chronic Care", "Wellness", "Pediatrics"].map(
                (cat, i) => (
                  <button
                    key={i}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${i === 0 ? "bg-sage-900 text-white shadow-xl" : "bg-white text-sage-600 border border-sage-100 hover:bg-sage-50"}`}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogData.posts.map((post, index) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                tags={post.tags}
                content={post.content}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Motivation Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass-card rounded-[4rem] p-12 md:p-20 overflow-hidden border-2 border-sage-50 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sage-50 rounded-full blur-[100px] opacity-60 -mr-20 -mt-20" />
            <div className="text-center relative z-10 space-y-8">
              <h4 className="section-kicker">Knowledge is Healing</h4>
              <h3 className="text-4xl md:text-5xl font-playfair font-bold text-sage-900 max-w-2xl mx-auto">
                Stay Informed with Our Quarterly Health Newsletter.
              </h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-8 py-5 rounded-2xl bg-cream-50 border border-sage-100 focus:outline-none focus:ring-2 focus:ring-sage-200 text-sage-900 font-medium"
                />
                <button className="btn-premium w-full md:w-auto px-10 py-5 text-xs font-bold tracking-widest uppercase shadow-none hover:shadow-xl">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-sage-600 font-bold uppercase tracking-widest italic">
                We respect your pulse. No spam, only science.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
