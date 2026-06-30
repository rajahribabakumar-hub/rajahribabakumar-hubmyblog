import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                contact: 'contact.html',
                privacy: 'privacy-policy.html',
                terms: 'terms.html',
                admin: 'admin.html',
                tools: 'tools.html',
                post1: 'posts/post1.html',
                post2: 'posts/post2.html',
                post3: 'posts/post3.html',
                post4: 'posts/post4.html',
                post5: 'posts/post5.html',
                post6: 'posts/post6.html',
                post7: 'posts/post7.html',
                post8: 'posts/post8.html',
                post9: 'posts/post9.html',
                post10: 'posts/post10.html',
                post11: 'posts/post11.html',
                post12: 'posts/post12.html',
                post13: 'posts/post13.html',
                post14: 'posts/post14.html',
                post15: 'posts/post15.html',
            },
        },
        outDir: 'dist',
    },
    publicDir: 'public',
});
