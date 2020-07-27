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
    
module.exports = {palindrome,avg,dummy,totalLikes};
