import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Blog Component Logic', () => {
  // Mock BlogPost data
  const mockPosts = [
    { id: 1, slug: 'post-1', title: 'OpenSIN vs Cursor', date: 'Apr 1, 2026', readTime: '8 Minuten', tags: ['opensin', 'cursor', 'vergleich'], excerpt: 'Vergleich zwischen OpenSIN und Cursor', category: 'Vergleich', author: 'OpenSIN Team' },
    { id: 2, slug: 'post-2', title: 'Upwork Case Study', date: 'Apr 2, 2026', readTime: '10 Minuten', tags: ['upwork', 'geld'], excerpt: 'Wie wir $2400 verdient haben', category: 'Case Study', author: 'OpenSIN Team' },
    { id: 3, slug: 'post-3', title: 'A2A Protokoll Deep Dive', date: 'Apr 3, 2026', readTime: '12 Minuten', tags: ['a2a', 'protokoll'], excerpt: 'Das A2A Protokoll erklärt', category: 'Technisch', author: 'OpenSIN Team' },
    { id: 4, slug: 'post-4', title: 'OpenSIN vs Claude Code', date: 'Apr 4, 2026', readTime: '9 Minuten', tags: ['opensin', 'claude'], excerpt: 'OpenSIN gegen Claude Code', category: 'Vergleich', author: 'OpenSIN Team' },
    { id: 5, slug: 'post-5', title: 'Launch Announcement', date: 'Apr 5, 2026', readTime: '5 Minuten', tags: ['launch', 'opensin'], excerpt: 'OpenSIN ist da!', category: 'Announcement', author: 'OpenSIN Team' },
  ];

  function createPostsFilter(posts: typeof mockPosts) {
    return {
      filterByCategory: (cat: string) => cat ? posts.filter(p => p.category === cat) : posts,
      filterBySearch: (query: string) => {
        const q = query.toLowerCase();
        return posts.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      },
      filterByBoth: (cat: string, query: string) => {
        let list = cat ? posts.filter(p => p.category === cat) : posts;
        const q = query.toLowerCase();
        if (q) {
          list = list.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
          );
        }
        return list;
      },
      limitPosts: (max: number) => max > 0 ? posts.slice(0, max) : posts,
      getCategories: () => Array.from(new Set(posts.map(p => p.category).filter(Boolean))).sort(),
    };
  }

  describe('Category Filtering', () => {
    const filter = createPostsFilter(mockPosts);

    it('should return all posts when no category selected', () => {
      expect(filter.filterByCategory('')).toHaveLength(5);
    });

    it('should filter by category "Vergleich"', () => {
      const result = filter.filterByCategory('Vergleich');
      expect(result).toHaveLength(2);
      expect(result.every(p => p.category === 'Vergleich')).toBe(true);
    });

    it('should filter by category "Case Study"', () => {
      const result = filter.filterByCategory('Case Study');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Upwork Case Study');
    });

    it('should return empty for non-existent category', () => {
      expect(filter.filterByCategory('NonExistent')).toHaveLength(0);
    });
  });

  describe('Search Filtering', () => {
    const filter = createPostsFilter(mockPosts);

    it('should return all posts for empty search', () => {
      expect(filter.filterBySearch('')).toHaveLength(5);
    });

    it('should find posts by title', () => {
      const result = filter.filterBySearch('Cursor');
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('Cursor');
    });

    it('should find posts by tag', () => {
      const result = filter.filterBySearch('a2a');
      expect(result).toHaveLength(1);
      expect(result[0].tags).toContain('a2a');
    });

    it('should find posts by excerpt', () => {
      const result = filter.filterBySearch('$2400');
      expect(result).toHaveLength(1);
      expect(result[0].excerpt).toContain('$2400');
    });

    it('should be case insensitive', () => {
      const resultUpper = filter.filterBySearch('OPENSIN');
      const resultLower = filter.filterBySearch('opensin');
      expect(resultUpper).toEqual(resultLower);
    });
  });

  describe('Combined Filtering', () => {
    const filter = createPostsFilter(mockPosts);

    it('should filter by category AND search', () => {
      const result = filter.filterByBoth('Vergleich', 'Claude');
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('Claude Code');
      expect(result[0].category).toBe('Vergleich');
    });

    it('should return empty when no match', () => {
      const result = filter.filterByBoth('Case Study', 'Cursor');
      expect(result).toHaveLength(0);
    });
  });

  describe('Post Limiting', () => {
    const filter = createPostsFilter(mockPosts);

    it('should limit to 5 posts', () => {
      expect(filter.limitPosts(5)).toHaveLength(5);
    });

    it('should limit to 3 posts', () => {
      expect(filter.limitPosts(3)).toHaveLength(3);
    });

    it('should return all when max is 0', () => {
      expect(filter.limitPosts(0)).toHaveLength(5);
    });

    it('should return all when max exceeds count', () => {
      expect(filter.limitPosts(100)).toHaveLength(5);
    });
  });

  describe('Category Extraction', () => {
    const filter = createPostsFilter(mockPosts);

    it('should extract unique categories sorted', () => {
      const cats = filter.getCategories();
      expect(cats).toEqual(['Announcement', 'Case Study', 'Technisch', 'Vergleich']);
    });

    it('should handle posts without category', () => {
      const postsNoCat = [...mockPosts, { ...mockPosts[0], category: '' }];
      const f = createPostsFilter(postsNoCat);
      const cats = f.getCategories();
      expect(cats).not.toContain('');
    });
  });
});
