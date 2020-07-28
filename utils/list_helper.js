const _ = require('lodash');
const palindrome = str => 
    str
        .split('')
        .reverse()
        .join('');
const avg = ary => 
    ary
        .reduce((s,i) => s + i,0)
        / ary.length;

const dummy = () => 1;
const totalLikes = blogs =>
    blogs
        .reduce((acc,blg) => blg.likes + acc, 0);
const favoriteBlog = (blogs) => 
    blogs.sort((b1,b2) => b1.likes - b2.likes).pop()

const mostBlogs = blogs => {
   const blogsCount =  _.countBy(blogs, 'author');
    const maxElt = Object.keys(blogsCount).sort((a,b)=> blogsCount[a] - blogsCount[b]).pop();
    return {author:maxElt,blogs:blogsCount[maxElt]}
}
const mostLikes = blogs => {
    const likeCounts = _.groupBy(blogs, 'author');
   return _.map(likeCounts, (val,key) => { 
        return {'author':key,'likes': val.reduce((acc,b) => acc + b.likes,0)}})
        .sort((a,b) => a.likes - b.likes).pop();
}
module.exports = {palindrome,avg,dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes};
