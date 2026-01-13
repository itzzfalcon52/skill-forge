export const stringProblems = [
    
{
    title: "Valid Palindrome",
    difficulty: "EASY",
    tags: ["String", "Two Pointers"],
    description: "Check if a string is palindrome ignoring non-alphanumeric characters and case.",
    constraints: "1 <= s.length <= 2 * 10^5",
    hints: "Filter string and use two pointers.",
    editorial: "Clean string to only lowercase alphanumerics, then compare from both ends.",
  
    testCases: [
      { input: "A man, a plan, a canal: Panama", output: "true" },
      { input: "race a car", output: "false" },
      { input: " ", output: "true" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "racecar", output: "true", explanation: "Same reversed" },
      PYTHON: { input: "hello", output: "false", explanation: "Not palindrome" },
      CPP: { input: "abba", output: "true", explanation: "Valid palindrome" }
    },
  
    codeSnippets: {
      JAVASCRIPT: "// implement",
      PYTHON: "# implement",
      CPP: "// implement"
    },
  
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim().toLowerCase().replace(/[^a-z0-9]/g,"");
  let l=0,r=s.length-1;
  while(l<r){
    if(s[l]!==s[r]){ console.log("false"); return; }
    l++; r--;
  }
  console.log("true");`,
      PYTHON: `import re
  s=re.sub(r'[^a-z0-9]','',input().strip().lower())
  l,r=0,len(s)-1
  while l<r:
      if s[l]!=s[r]:
          print("false"); exit()
      l+=1; r-=1
  print("true")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s,line;
    getline(cin,line);
    for(char c:line) if(isalnum(c)) s.push_back(tolower(c));
    int l=0,r=s.size()-1;
    while(l<r){
      if(s[l++]!=s[r--]){ cout<<"false"; return 0; }
    }
    cout<<"true";
  }`
    }
  },
  
  /* ============================================================
     2. Longest Substring Without Repeating Characters
     ============================================================ */
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "MEDIUM",
    tags: ["String", "Sliding Window", "HashMap"],
    description: "Return the length of the longest substring without repeating characters.",
    constraints: "0 <= s.length <= 2 * 10^5",
    hints: "Use sliding window and hashmap.",
    editorial: "Expand right pointer, shrink left when duplicate appears.",
  
    testCases: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" },
      { input: "pwwkew", output: "3" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "abcabcbb", output: "3", explanation: "abc" },
      PYTHON: { input: "bbbbb", output: "1", explanation: "b" },
      CPP: { input: "pwwkew", output: "3", explanation: "wke" }
    },
  
    codeSnippets: { JAVASCRIPT: "// implement", PYTHON: "# implement", CPP: "// implement" },
  
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  let map=new Map(), l=0, ans=0;
  for(let r=0;r<s.length;r++){
    if(map.has(s[r])) l=Math.max(l, map.get(s[r])+1);
    map.set(s[r], r);
    ans=Math.max(ans, r-l+1);
  }
  console.log(ans);`,
      PYTHON: `s=input().strip()
  mp={}
  l=0; ans=0
  for r,c in enumerate(s):
      if c in mp:
          l=max(l, mp[c]+1)
      mp[c]=r
      ans=max(ans, r-l+1)
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    unordered_map<char,int> mp;
    int l=0, ans=0;
    for(int r=0;r<s.size();r++){
      if(mp.count(s[r])) l=max(l, mp[s[r]]+1);
      mp[s[r]]=r;
      ans=max(ans, r-l+1);
    }
    cout<<ans;
  }`
    }
  },
  
  /* ============================================================
     3. Longest Valid Parentheses
     ============================================================ */
  {
    title: "Longest Valid Parentheses",
    difficulty: "HARD",
    tags: ["String", "Stack", "DP"],
    description: "Find the length of the longest valid parentheses substring.",
    constraints: "0 <= s.length <= 3 * 10^5",
    hints: "Use stack with base index.",
    editorial: "Stack stores indices of '(' and last invalid ')'.",
  
    testCases: [
      { input: "(()", output: "2" },
      { input: ")()())", output: "4" },
      { input: "", output: "0" }
    ],
  
    examples: {
      JAVASCRIPT: { input: ")()())", output: "4", explanation: "()()" },
      PYTHON: { input: "(()", output: "2", explanation: "()" },
      CPP: { input: "", output: "0", explanation: "Empty" }
    },
  
    codeSnippets: { JAVASCRIPT: "// implement", PYTHON: "# implement", CPP: "// implement" },
  
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  let st=[-1], ans=0;
  for(let i=0;i<s.length;i++){
    if(s[i]=='(') st.push(i);
    else{
      st.pop();
      if(st.length===0) st.push(i);
      else ans=Math.max(ans, i-st[st.length-1]);
    }
  }
  console.log(ans);`,
      PYTHON: `s=input().strip()
  st=[-1]
  ans=0
  for i,c in enumerate(s):
      if c=='(':
          st.append(i)
      else:
          st.pop()
          if not st:
              st.append(i)
          else:
              ans=max(ans, i-st[-1])
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    stack<int> st;
    st.push(-1);
    int ans=0;
    for(int i=0;i<s.size();i++){
      if(s[i]=='(') st.push(i);
      else{
        st.pop();
        if(st.empty()) st.push(i);
        else ans=max(ans, i-st.top());
      }
    }
    cout<<ans;
  }`
    }
  },
  
  /* ============================================================
     4. Minimum Window Substring
     ============================================================ */
  {
    title: "Minimum Window Substring",
    difficulty: "HARD",
    tags: ["String", "Sliding Window", "HashMap"],
    description: "Find the minimum window substring that contains all characters of t.",
    constraints: "1 <= s, t <= 2 * 10^5",
    hints: "Sliding window with frequency counter.",
    editorial: "Expand right until valid, shrink left.",
  
    testCases: [
      { input: "ADOBECODEBANC ABC", output: "BANC" },
      { input: "a a", output: "a" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "ADOBECODEBANC ABC", output: "BANC", explanation: "Smallest window" },
      PYTHON: { input: "a a", output: "a", explanation: "Exact match" },
      CPP: { input: "a b", output: "", explanation: "Impossible" }
    },
  
    codeSnippets: { JAVASCRIPT: "// implement", PYTHON: "# implement", CPP: "// implement" },
  
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs").readFileSync(0,"utf8").trim().split(/\\s+/);
  let s=fs[0], t=fs[1];
  let need={}, have={}, needCnt=0;
  for(let c of t){ if(!need[c]) need[c]=0, needCnt++; need[c]++; }
  let l=0, formed=0, ans=[Infinity,0,0];
  for(let r=0;r<s.length;r++){
    let c=s[r];
    have[c]=(have[c]||0)+1;
    if(need[c] && have[c]===need[c]) formed++;
    while(l<=r && formed===needCnt){
      if(r-l+1<ans[0]) ans=[r-l+1,l,r];
      have[s[l]]--;
      if(need[s[l]] && have[s[l]]<need[s[l]]) formed--;
      l++;
    }
  }
  console.log(ans[0]===Infinity?"":s.slice(ans[1],ans[2]+1));`,
      PYTHON: `s,t=input().split()
  from collections import Counter
  need=Counter(t)
  have={}
  needCnt=len(need)
  l=0; formed=0
  ans=(10**18,0,0)
  for r,c in enumerate(s):
      have[c]=have.get(c,0)+1
      if c in need and have[c]==need[c]:
          formed+=1
      while l<=r and formed==needCnt:
          if r-l+1<ans[0]:
              ans=(r-l+1,l,r)
          have[s[l]]-=1
          if s[l] in need and have[s[l]]<need[s[l]]:
              formed-=1
          l+=1
  print("" if ans[0]==10**18 else s[ans[1]:ans[2]+1])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s,t; cin>>s>>t;
    unordered_map<char,int> need, have;
    for(char c:t) need[c]++;
    int needCnt=need.size(), formed=0;
    int l=0; int best=INT_MAX, bl=0, br=0;
    for(int r=0;r<s.size();r++){
      have[s[r]]++;
      if(need.count(s[r]) && have[s[r]]==need[s[r]]) formed++;
      while(l<=r && formed==needCnt){
        if(r-l+1<best){ best=r-l+1; bl=l; br=r; }
        have[s[l]]--;
        if(need.count(s[l]) && have[s[l]]<need[s[l]]) formed--;
        l++;
      }
    }
    if(best==INT_MAX) cout<<"";
    else cout<<s.substr(bl, best);
  }`
    }
  },
  
  /* ============================================================
     5. Longest Palindromic Substring
     ============================================================ */
  {
    title: "Longest Palindromic Substring",
    difficulty: "MEDIUM",
    tags: ["String", "DP", "Two Pointers"],
    description: "Return the longest palindromic substring.",
    constraints: "1 <= s.length <= 2000",
    hints: "Expand around center.",
    editorial: "Check odd and even centers.",
  
    testCases: [
      { input: "babad", output: "bab" },
      { input: "cbbd", output: "bb" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "babad", output: "bab", explanation: "aba also valid" },
      PYTHON: { input: "cbbd", output: "bb", explanation: "Even palindrome" },
      CPP: { input: "a", output: "a", explanation: "Single char" }
    },
  
    codeSnippets: { JAVASCRIPT: "// implement", PYTHON: "# implement", CPP: "// implement" },
  
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  let start=0, len=0;
  function expand(l,r){
    while(l>=0 && r<s.length && s[l]===s[r]){ l--; r++; }
    if(r-l-1>len){ len=r-l-1; start=l+1; }
  }
  for(let i=0;i<s.length;i++){
    expand(i,i);
    expand(i,i+1);
  }
  console.log(s.substr(start,len));`,
      PYTHON: `s=input().strip()
  start=0; ln=0
  def expand(l,r):
      global start, ln
      while l>=0 and r<len(s) and s[l]==s[r]:
          l-=1; r+=1
      if r-l-1>ln:
          ln=r-l-1; start=l+1
  
  for i in range(len(s)):
      expand(i,i)
      expand(i,i+1)
  
  print(s[start:start+ln])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    int start=0,len=0;
    auto expand=[&](int l,int r){
      while(l>=0 && r<s.size() && s[l]==s[r]){ l--; r++; }
      if(r-l-1>len){ len=r-l-1; start=l+1; }
    };
    for(int i=0;i<s.size();i++){
      expand(i,i);
      expand(i,i+1);
    }
    cout<<s.substr(start,len);
  }`
    }
  },
  /* ============================================================
   1. Regular Expression Matching
   ============================================================ */
{
    title: "Regular Expression Matching",
    difficulty: "HARD",
    tags: ["String", "DP"],
    description: "Implement regex matching with support for '.' and '*'.",
    constraints: "1 <= s.length, p.length <= 2000",
    hints: "DP: dp[i][j] = match s[0..i] with p[0..j]",
    editorial: "Classic DP. '*' means zero or more of previous char.",
  
    testCases: [
      { input: "aa a", output: "false" },
      { input: "aa a*", output: "true" },
      { input: "ab .*", output: "true" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "aa a*", output: "true", explanation: "a* matches any number of a" },
      PYTHON: { input: "ab .*", output: "true", explanation: ".* matches everything" },
      CPP: { input: "mississippi mis*is*p*.", output: "false", explanation: "Pattern fails" }
    },
  
    codeSnippets: { JAVASCRIPT: "// implement", PYTHON: "# implement", CPP: "// implement" },
  
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs").readFileSync(0,"utf8").trim().split(/\\s+/);
  let s=fs[0], p=fs[1];
  let dp=Array(s.length+1).fill(0).map(()=>Array(p.length+1).fill(false));
  dp[0][0]=true;
  for(let j=2;j<=p.length;j++){
    if(p[j-1]=='*') dp[0][j]=dp[0][j-2];
  }
  for(let i=1;i<=s.length;i++){
    for(let j=1;j<=p.length;j++){
      if(p[j-1]=='.' || p[j-1]==s[i-1]) dp[i][j]=dp[i-1][j-1];
      else if(p[j-1]=='*'){
        dp[i][j]=dp[i][j-2];
        if(p[j-2]=='.' || p[j-2]==s[i-1]) dp[i][j]|=dp[i-1][j];
      }
    }
  }
  console.log(dp[s.length][p.length]?"true":"false");`,
      PYTHON: `s,p=input().split()
  dp=[[False]*(len(p)+1) for _ in range(len(s)+1)]
  dp[0][0]=True
  for j in range(2,len(p)+1):
      if p[j-1]=='*':
          dp[0][j]=dp[0][j-2]
  for i in range(1,len(s)+1):
      for j in range(1,len(p)+1):
          if p[j-1]=='.' or p[j-1]==s[i-1]:
              dp[i][j]=dp[i-1][j-1]
          elif p[j-1]=='*':
              dp[i][j]=dp[i][j-2]
              if p[j-2]=='.' or p[j-2]==s[i-1]:
                  dp[i][j]|=dp[i-1][j]
  print("true" if dp[len(s)][len(p)] else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s,p; cin>>s>>p;
    int n=s.size(), m=p.size();
    vector<vector<bool>> dp(n+1, vector<bool>(m+1,false));
    dp[0][0]=true;
    for(int j=2;j<=m;j++) if(p[j-1]=='*') dp[0][j]=dp[0][j-2];
    for(int i=1;i<=n;i++){
      for(int j=1;j<=m;j++){
        if(p[j-1]=='.'||p[j-1]==s[i-1]) dp[i][j]=dp[i-1][j-1];
        else if(p[j-1]=='*'){
          dp[i][j]=dp[i][j-2];
          if(p[j-2]=='.'||p[j-2]==s[i-1]) dp[i][j]|=dp[i-1][j];
        }
      }
    }
    cout<<(dp[n][m]?"true":"false");
  }`
    }
  },
  
  /* ============================================================
     2. Minimum Window Subsequence
     ============================================================ */
  {
    title: "Minimum Window Subsequence",
    difficulty: "HARD",
    tags: ["String", "DP", "Two Pointers"],
    description: "Find the minimum window in S which contains T as subsequence.",
    constraints: "1 <= S, T <= 2 * 10^5",
    hints: "DP or two-pass greedy.",
    editorial: "Greedy forward + backward shrinking window.",
  
    testCases: [
      { input: "abcdebdde bde", output: "bcde" },
      { input: "jmeqksfrsdcmsiwvaovztaqenprpvnbstl rtv", output: "" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "abcdebdde bde", output: "bcde", explanation: "Shortest subsequence window" },
      PYTHON: { input: "a b", output: "", explanation: "Impossible" },
      CPP: { input: "abc ac", output: "abc", explanation: "Full window" }
    },
  
    codeSnippets: { JAVASCRIPT: "// implement", PYTHON: "# implement", CPP: "// implement" },
  
    referenceSolution: {
      JAVASCRIPT: `let [S,T]=require("fs").readFileSync(0,"utf8").trim().split(/\\s+/);
  let n=S.length,m=T.length, ans="";
  let i=0;
  while(i<n){
    if(S[i]!=T[0]){ i++; continue; }
    let s=i,t=0;
    while(s<n && t<m){
      if(S[s]==T[t]) t++;
      s++;
    }
    if(t<m) break;
    let end=s-1;
    t=m-1; s=end;
    while(s>=i){
      if(S[s]==T[t]) t--;
      if(t<0) break;
      s--;
    }
    let start=s;
    if(ans==""||end-start+1<ans.length) ans=S.slice(start,end+1);
    i=start+1;
  }
  console.log(ans);`,
      PYTHON: `S,T=input().split()
  n,m=len(S),len(T)
  ans=""
  i=0
  while i<n:
      if S[i]!=T[0]:
          i+=1; continue
      s=i; t=0
      while s<n and t<m:
          if S[s]==T[t]: t+=1
          s+=1
      if t<m: break
      end=s-1
      t=m-1; s=end
      while s>=i:
          if S[s]==T[t]: t-=1
          if t<0: break
          s-=1
      start=s
      if ans=="" or end-start+1<len(ans):
          ans=S[start:end+1]
      i=start+1
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string S,T; cin>>S>>T;
    int n=S.size(), m=T.size();
    string ans="";
    for(int i=0;i<n;i++){
      if(S[i]!=T[0]) continue;
      int s=i,t=0;
      while(s<n && t<m){
        if(S[s]==T[t]) t++;
        s++;
      }
      if(t<m) break;
      int end=s-1;
      t=m-1; s=end;
      while(s>=i){
        if(S[s]==T[t]) t--;
        if(t<0) break;
        s--;
      }
      int start=s;
      if(ans=="" || end-start+1<ans.size()) ans=S.substr(start,end-start+1);
      i=start;
    }
    cout<<ans;
  }`
    }
  },
  
  /* ============================================================
     3. Palindrome Partitioning II
     ============================================================ */
  {
    title: "Palindrome Partitioning II",
    difficulty: "HARD",
    tags: ["String", "DP"],
    description: "Return minimum cuts to partition string into palindromes.",
    constraints: "1 <= s.length <= 2000",
    hints: "DP + palindrome table.",
    editorial: "Precompute palindromes then DP over cuts.",
  
    testCases: [
      { input: "aab", output: "1" },
      { input: "a", output: "0" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "aab", output: "1", explanation: "aa|b" },
      PYTHON: { input: "ab", output: "1", explanation: "a|b" },
      CPP: { input: "racecar", output: "0", explanation: "Already palindrome" }
    },
  
    codeSnippets: { JAVASCRIPT: "// implement", PYTHON: "# implement", CPP: "// implement" },
  
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  let n=s.length;
  let pal=Array(n).fill(0).map(()=>Array(n).fill(false));
  for(let i=n-1;i>=0;i--){
    for(let j=i;j<n;j++){
      if(s[i]==s[j] && (j-i<2 || pal[i+1][j-1])) pal[i][j]=true;
    }
  }
  let dp=Array(n).fill(Infinity);
  for(let i=0;i<n;i++){
    if(pal[0][i]) dp[i]=0;
    else{
      for(let j=0;j<i;j++){
        if(pal[j+1][i]) dp[i]=Math.min(dp[i], dp[j]+1);
      }
    }
  }
  console.log(dp[n-1]);`,
      PYTHON: `s=input().strip()
  n=len(s)
  pal=[[False]*n for _ in range(n)]
  for i in range(n-1,-1,-1):
      for j in range(i,n):
          if s[i]==s[j] and (j-i<2 or pal[i+1][j-1]):
              pal[i][j]=True
  dp=[10**9]*n
  for i in range(n):
      if pal[0][i]: dp[i]=0
      else:
          for j in range(i):
              if pal[j+1][i]:
                  dp[i]=min(dp[i], dp[j]+1)
  print(dp[n-1])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    int n=s.size();
    vector<vector<bool>> pal(n, vector<bool>(n,false));
    for(int i=n-1;i>=0;i--){
      for(int j=i;j<n;j++){
        if(s[i]==s[j] && (j-i<2 || pal[i+1][j-1])) pal[i][j]=true;
      }
    }
    vector<int> dp(n,1e9);
    for(int i=0;i<n;i++){
      if(pal[0][i]) dp[i]=0;
      else{
        for(int j=0;j<i;j++){
          if(pal[j+1][i]) dp[i]=min(dp[i], dp[j]+1);
        }
      }
    }
    cout<<dp[n-1];
  }`
    }
  },
  {
    title: "Check Anagram",
    difficulty: "EASY",
    tags: ["String", "Hashing"],
    description: "Given two strings, check if they are anagrams of each other.",
    constraints: "1 <= length <= 10^5",
    hints: "Count characters.",
    editorial: "Use frequency array or map.",
    testCases: [
      { input: "listen silent", output: "true" },
      { input: "rat car", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "listen silent", output: "true", explanation: "Same character counts" },
      PYTHON: { input: "rat car", output: "false", explanation: "Different letters" },
      CPP: { input: "a a", output: "true", explanation: "Same string" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const [a,b] = fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  if(a.length!==b.length){ console.log("false"); return; }
  const cnt=new Map();
  for(const c of a) cnt.set(c,(cnt.get(c)||0)+1);
  for(const c of b){
    if(!cnt.has(c)){ console.log("false"); return; }
    cnt.set(c,cnt.get(c)-1);
    if(cnt.get(c)===0) cnt.delete(c);
  }
  console.log(cnt.size===0 ? "true" : "false");`,
      PYTHON: `a,b=input().split()
  if len(a)!=len(b):
      print("false")
  else:
      from collections import Counter
      print("true" if Counter(a)==Counter(b) else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string a,b; cin>>a>>b;
    if(a.size()!=b.size()){ cout<<"false"; return 0; }
    vector<int> cnt(256,0);
    for(char c:a) cnt[c]++;
    for(char c:b) cnt[c]--;
    for(int x:cnt) if(x!=0){ cout<<"false"; return 0; }
    cout<<"true";
  }`
    }
  },
  {
    title: "First Unique Character",
    difficulty: "EASY",
    tags: ["String", "Hashing"],
    description: "Given a string, find the index of the first non-repeating character. If none, print -1.",
    constraints: "1 <= length <= 10^5",
    hints: "Count frequency.",
    editorial: "Two passes: count then scan.",
    testCases: [
      { input: "leetcode", output: "0" },
      { input: "aabb", output: "-1" }
    ],
    examples: {
      JAVASCRIPT: { input: "leetcode", output: "0", explanation: "l is unique" },
      PYTHON: { input: "aabb", output: "-1", explanation: "No unique" },
      CPP: { input: "loveleetcode", output: "2", explanation: "v is first unique" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const s = fs.readFileSync(0,"utf8").trim();
  const cnt=new Map();
  for(const c of s) cnt.set(c,(cnt.get(c)||0)+1);
  let ans=-1;
  for(let i=0;i<s.length;i++){
    if(cnt.get(s[i])===1){ ans=i; break; }
  }
  console.log(ans);`,
      PYTHON: `s=input().strip()
  from collections import Counter
  cnt=Counter(s)
  ans=-1
  for i,c in enumerate(s):
      if cnt[c]==1:
          ans=i
          break
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    vector<int> cnt(256,0);
    for(char c:s) cnt[c]++;
    for(int i=0;i<s.size();i++){
      if(cnt[s[i]]==1){ cout<<i; return 0; }
    }
    cout<<-1;
  }`
    }
  },
  {
    title: "Valid Parentheses",
    difficulty: "EASY",
    tags: ["String", "Stack"],
    description: "Given a string containing only brackets (), {}, [], check if it is valid.",
    constraints: "1 <= length <= 10^5",
    hints: "Use stack.",
    editorial: "Push opening, match closing.",
    testCases: [
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "()[]{}", output: "true", explanation: "All matched" },
      PYTHON: { input: "(]", output: "false", explanation: "Mismatch" },
      CPP: { input: "([)]", output: "false", explanation: "Wrong order" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const s = fs.readFileSync(0,"utf8").trim();
  const st=[];
  const mp={')':'(',']':'[','}':'{'};
  let ok=true;
  for(const c of s){
    if(c==='('||c==='['||c==='{') st.push(c);
    else{
      if(st.length===0 || st.pop()!==mp[c]){ ok=false; break; }
    }
  }
  if(st.length!==0) ok=false;
  console.log(ok?"true":"false");`,
      PYTHON: `s=input().strip()
  st=[]
  mp={')':'(',']':'[','}':'{'}
  ok=True
  for c in s:
      if c in "([{":
          st.append(c)
      else:
          if not st or st.pop()!=mp[c]:
              ok=False
              break
  if st: ok=False
  print("true" if ok else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    stack<char> st;
    unordered_map<char,char> mp={{')','('},{']','['},{'}','{'}};
    bool ok=true;
    for(char c:s){
      if(c=='('||c=='['||c=='{') st.push(c);
      else{
        if(st.empty() || st.top()!=mp[c]){ ok=false; break; }
        st.pop();
      }
    }
    if(!st.empty()) ok=false;
    cout<<(ok?"true":"false");
  }`
    }
  },
  {
    title: "Longest Palindromic Substring",
    difficulty: "MEDIUM",
    tags: ["String", "DP"],
    description: "Given a string, find the longest palindromic substring.",
    constraints: "1 <= length <= 2000",
    hints: "Expand around center or DP.",
    editorial: "Try every center.",
    testCases: [
      { input: "babad", output: "bab" },
      { input: "cbbd", output: "bb" }
    ],
    examples: {
      JAVASCRIPT: { input: "babad", output: "bab", explanation: "aba also valid" },
      PYTHON: { input: "cbbd", output: "bb", explanation: "Middle two" },
      CPP: { input: "a", output: "a", explanation: "Single char" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const s = fs.readFileSync(0,"utf8").trim();
  let start=0, end=0;
  function expand(l,r){
    while(l>=0 && r<s.length && s[l]===s[r]){ l--; r++; }
    return [l+1, r-1];
  }
  for(let i=0;i<s.length;i++){
    let [l1,r1]=expand(i,i);
    let [l2,r2]=expand(i,i+1);
    if(r1-l1 > end-start){ start=l1; end=r1; }
    if(r2-l2 > end-start){ start=l2; end=r2; }
  }
  console.log(s.substring(start,end+1));`,
      PYTHON: `s=input().strip()
  start=end=0
  def expand(l,r):
      while l>=0 and r<len(s) and s[l]==s[r]:
          l-=1; r+=1
      return l+1, r-1
  for i in range(len(s)):
      l1,r1=expand(i,i)
      l2,r2=expand(i,i+1)
      if r1-l1 > end-start:
          start,end=l1,r1
      if r2-l2 > end-start:
          start,end=l2,r2
  print(s[start:end+1])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    int n=s.size();
    int start=0,end=0;
    auto expand = [&](int l,int r){
      while(l>=0 && r<n && s[l]==s[r]){ l--; r++; }
      return pair<int,int>(l+1,r-1);
    };
    for(int i=0;i<n;i++){
      auto [l1,r1]=expand(i,i);
      auto [l2,r2]=expand(i,i+1);
      if(r1-l1 > end-start){ start=l1; end=r1; }
      if(r2-l2 > end-start){ start=l2; end=r2; }
    }
    cout<<s.substr(start,end-start+1);
  }`
    }
  },
  {
    title: "String Compression",
    difficulty: "EASY",
    tags: ["String"],
    description: "Compress the string by replacing consecutive repeating characters with char + count.",
    constraints: "1 <= length <= 10^5",
    hints: "Two pointers.",
    editorial: "Iterate and count runs.",
    testCases: [
      { input: "aaabbc", output: "a3b2c1" },
      { input: "abcd", output: "a1b1c1d1" }
    ],
    examples: {
      JAVASCRIPT: { input: "aaabbc", output: "a3b2c1", explanation: "Run-length encoding" },
      PYTHON: { input: "abcd", output: "a1b1c1d1", explanation: "All single" },
      CPP: { input: "a", output: "a1", explanation: "Single char" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const s = fs.readFileSync(0,"utf8").trim();
  let res="";
  let i=0;
  while(i<s.length){
    let j=i;
    while(j<s.length && s[j]===s[i]) j++;
    res += s[i] + (j-i);
    i=j;
  }
  console.log(res);`,
      PYTHON: `s=input().strip()
  res=[]
  i=0
  while i<len(s):
      j=i
      while j<len(s) and s[j]==s[i]:
          j+=1
      res.append(s[i]+str(j-i))
      i=j
  print("".join(res))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    string res="";
    for(int i=0;i<s.size();){
      int j=i;
      while(j<s.size() && s[j]==s[i]) j++;
      res.push_back(s[i]);
      res += to_string(j-i);
      i=j;
    }
    cout<<res;
  }`
    }
  },
  {
    title: "Remove Adjacent Duplicates",
    difficulty: "EASY",
    tags: ["String", "Stack"],
    description: "Given a string, repeatedly remove adjacent duplicate characters until no such pairs exist.",
    constraints: "1 <= length <= 10^5",
    hints: "Use stack.",
    editorial: "Simulate removals.",
    testCases: [
      { input: "abbaca", output: "ca" },
      { input: "azxxzy", output: "ay" }
    ],
    examples: {
      JAVASCRIPT: { input: "abbaca", output: "ca", explanation: "bb and aa removed" },
      PYTHON: { input: "azxxzy", output: "ay", explanation: "xx and zz removed" },
      CPP: { input: "aabb", output: "", explanation: "All removed" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const s = fs.readFileSync(0,"utf8").trim();
  const st=[];
  for(const c of s){
    if(st.length && st[st.length-1]===c) st.pop();
    else st.push(c);
  }
  console.log(st.join(""));`,
      PYTHON: `s=input().strip()
  st=[]
  for c in s:
      if st and st[-1]==c:
          st.pop()
      else:
          st.append(c)
  print("".join(st))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    string st="";
    for(char c:s){
      if(!st.empty() && st.back()==c) st.pop_back();
      else st.push_back(c);
    }
    cout<<st;
  }`
    }
  },
  {
    title: "Find All Anagram Indices",
    difficulty: "MEDIUM",
    tags: ["String", "Sliding Window"],
    description: "Given strings s and p, find all start indices in s where substring is an anagram of p.",
    constraints: "1 <= length <= 10^5",
    hints: "Sliding window with frequency count.",
    editorial: "Maintain window counts.",
    testCases: [
      { input: "cbaebabacd abc", output: "0 6" },
      { input: "abab ab", output: "0 1 2" }
    ],
    examples: {
      JAVASCRIPT: { input: "cbaebabacd abc", output: "0 6", explanation: "cba and bac" },
      PYTHON: { input: "abab ab", output: "0 1 2", explanation: "ab, ba, ab" },
      CPP: { input: "aa a", output: "0 1", explanation: "Two windows" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const [s,p] = fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  const need=new Array(26).fill(0);
  const win=new Array(26).fill(0);
  for(const c of p) need[c.charCodeAt(0)-97]++;
  let res=[];
  let l=0;
  for(let r=0;r<s.length;r++){
    win[s.charCodeAt(r)-97]++;
    if(r-l+1>p.length){
      win[s.charCodeAt(l)-97]--;
      l++;
    }
    if(r-l+1===p.length){
      if(need.every((v,i)=>v===win[i])) res.push(l);
    }
  }
  console.log(res.join(" "));`,
      PYTHON: `s,p=input().split()
  need=[0]*26
  win=[0]*26
  for c in p:
      need[ord(c)-97]+=1
  res=[]
  l=0
  for r in range(len(s)):
      win[ord(s[r])-97]+=1
      if r-l+1>len(p):
          win[ord(s[l])-97]-=1
          l+=1
      if r-l+1==len(p):
          if win==need:
              res.append(l)
  print(" ".join(map(str,res)))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s,p; cin>>s>>p;
    vector<int> need(26,0), win(26,0);
    for(char c:p) need[c-'a']++;
    vector<int> res;
    int l=0;
    for(int r=0;r<s.size();r++){
      win[s[r]-'a']++;
      if(r-l+1>p.size()){
        win[s[l]-'a']--;
        l++;
      }
      if(r-l+1==p.size()){
        if(win==need) res.push_back(l);
      }
    }
    for(int i=0;i<res.size();i++){
      if(i) cout<<" ";
      cout<<res[i];
    }
  }`
    }
  },
  {
    title: "Isomorphic Strings",
    difficulty: "EASY",
    tags: ["String", "Hashing"],
    description: "Given two strings, check if they are isomorphic.",
    constraints: "1 <= length <= 10^5",
    hints: "Maintain two maps.",
    editorial: "One-to-one character mapping.",
    testCases: [
      { input: "egg add", output: "true" },
      { input: "foo bar", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "egg add", output: "true", explanation: "e->a, g->d" },
      PYTHON: { input: "foo bar", output: "false", explanation: "o maps twice" },
      CPP: { input: "ab aa", output: "false", explanation: "Not bijection" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const [s,t]=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  if(s.length!==t.length){ console.log("false"); return; }
  const m1=new Map(), m2=new Map();
  let ok=true;
  for(let i=0;i<s.length;i++){
    const a=s[i], b=t[i];
    if((m1.has(a) && m1.get(a)!==b) || (m2.has(b) && m2.get(b)!==a)){
      ok=false; break;
    }
    m1.set(a,b); m2.set(b,a);
  }
  console.log(ok?"true":"false");`,
      PYTHON: `s,t=input().split()
  if len(s)!=len(t):
      print("false")
  else:
      m1={}; m2={}
      ok=True
      for a,b in zip(s,t):
          if (a in m1 and m1[a]!=b) or (b in m2 and m2[b]!=a):
              ok=False; break
          m1[a]=b; m2[b]=a
      print("true" if ok else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s,t; cin>>s>>t;
    if(s.size()!=t.size()){ cout<<"false"; return 0; }
    unordered_map<char,char> m1,m2;
    bool ok=true;
    for(int i=0;i<s.size();i++){
      char a=s[i], b=t[i];
      if((m1.count(a) && m1[a]!=b) || (m2.count(b) && m2[b]!=a)){ ok=false; break; }
      m1[a]=b; m2[b]=a;
    }
    cout<<(ok?"true":"false");
  }`
    }
  },
  {
    title: "Find Substring (strStr)",
    difficulty: "EASY",
    tags: ["String"],
    description: "Given two strings haystack and needle, return the index of first occurrence of needle in haystack or -1.",
    constraints: "1 <= length <= 10^5",
    hints: "Brute force or KMP.",
    editorial: "Simple scanning.",
    testCases: [
      { input: "hello ll", output: "2" },
      { input: "aaaaa bba", output: "-1" }
    ],
    examples: {
      JAVASCRIPT: { input: "hello ll", output: "2", explanation: "Starts at index 2" },
      PYTHON: { input: "abc d", output: "-1", explanation: "Not found" },
      CPP: { input: "a a", output: "0", explanation: "Same string" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const [h,n]=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  console.log(h.indexOf(n));`,
      PYTHON: `h,n=input().split()
  print(h.find(n))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string h,n; cin>>h>>n;
    auto pos=h.find(n);
    if(pos==string::npos) cout<<-1;
    else cout<<pos;
  }`
    }
  },
  {
    title: "Multiply Strings",
    difficulty: "MEDIUM",
    tags: ["String", "Math"],
    description: "Given two non-negative integers as strings, return their product as a string.",
    constraints: "1 <= length <= 200",
    hints: "Simulate multiplication.",
    editorial: "Grade-school multiplication.",
    testCases: [
      { input: "123 456", output: "56088" },
      { input: "0 999", output: "0" }
    ],
    examples: {
      JAVASCRIPT: { input: "123 456", output: "56088", explanation: "123*456" },
      PYTHON: { input: "0 999", output: "0", explanation: "Zero" },
      CPP: { input: "9 9", output: "81", explanation: "Single digit" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  let [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  if(a==="0"||b==="0"){ console.log("0"); return; }
  const n=a.length, m=b.length;
  const res=new Array(n+m).fill(0);
  for(let i=n-1;i>=0;i--){
    for(let j=m-1;j>=0;j--){
      const mul=(a.charCodeAt(i)-48)*(b.charCodeAt(j)-48);
      const sum=mul+res[i+j+1];
      res[i+j+1]=sum%10;
      res[i+j]+=Math.floor(sum/10);
    }
  }
  let i=0;
  while(i<res.length && res[i]===0) i++;
  console.log(res.slice(i).join(""));`,
      PYTHON: `a,b=input().split()
  if a=="0" or b=="0":
      print("0")
  else:
      n=len(a); m=len(b)
      res=[0]*(n+m)
      for i in range(n-1,-1,-1):
          for j in range(m-1,-1,-1):
              mul=(ord(a[i])-48)*(ord(b[j])-48)
              s=mul+res[i+j+1]
              res[i+j+1]=s%10
              res[i+j]+=s//10
      i=0
      while i<len(res) and res[i]==0: i+=1
      print("".join(map(str,res[i:])))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string a,b; cin>>a>>b;
    if(a=="0"||b=="0"){ cout<<"0"; return 0; }
    int n=a.size(), m=b.size();
    vector<int> res(n+m,0);
    for(int i=n-1;i>=0;i--){
      for(int j=m-1;j>=0;j--){
        int mul=(a[i]-'0')*(b[j]-'0');
        int sum=mul+res[i+j+1];
        res[i+j+1]=sum%10;
        res[i+j]+=sum/10;
      }
    }
    int i=0;
    while(i<res.size() && res[i]==0) i++;
    for(;i<res.size();i++) cout<<res[i];
  }`
    }
  },
  {
    title: "Count and Say",
    difficulty: "MEDIUM",
    tags: ["String"],
    description: "Given n, return the nth term of the count-and-say sequence.",
    constraints: "1 <= n <= 30",
    hints: "Simulate.",
    editorial: "Iteratively build string.",
    testCases: [
      { input: "4", output: "1211" },
      { input: "1", output: "1" }
    ],
    examples: {
      JAVASCRIPT: { input: "4", output: "1211", explanation: "Sequence" },
      PYTHON: { input: "1", output: "1", explanation: "Base" },
      CPP: { input: "2", output: "11", explanation: "One 1" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  let n=parseInt(fs.readFileSync(0,"utf8"));
  let s="1";
  for(let k=2;k<=n;k++){
    let t="";
    for(let i=0;i<s.length;){
      let j=i;
      while(j<s.length && s[j]===s[i]) j++;
      t += (j-i) + s[i];
      i=j;
    }
    s=t;
  }
  console.log(s);`,
      PYTHON: `n=int(input())
  s="1"
  for _ in range(2,n+1):
      t=""
      i=0
      while i<len(s):
          j=i
          while j<len(s) and s[j]==s[i]:
              j+=1
          t += str(j-i)+s[i]
          i=j
      s=t
  print(s)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    string s="1";
    for(int k=2;k<=n;k++){
      string t="";
      for(int i=0;i<s.size();){
        int j=i;
        while(j<s.size() && s[j]==s[i]) j++;
        t += to_string(j-i);
        t.push_back(s[i]);
        i=j;
      }
      s=t;
    }
    cout<<s;
  }`
    }
  },
  {
    title: "Group Anagrams",
    difficulty: "MEDIUM",
    tags: ["String", "Hashing"],
    description: "Given a list of strings, group the anagrams together.",
    constraints: "1 <= n <= 10^4",
    hints: "Sort each word as key.",
    editorial: "Use hashmap keyed by sorted string.",
    testCases: [
      { input: "4\neat tea tan ate", output: "2 2" },
      { input: "1\nabc", output: "1" }
    ],
    examples: {
      JAVASCRIPT: { input: "4\neat tea tan ate", output: "2 2", explanation: "Two groups" },
      PYTHON: { input: "1\nabc", output: "1", explanation: "Single group" },
      CPP: { input: "3\nab ba cd", output: "2 1", explanation: "Two groups" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const data=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  let i=0;
  const n=parseInt(data[i++]);
  const arr=data.slice(i,i+n);
  const mp=new Map();
  for(const w of arr){
    const key=w.split("").sort().join("");
    if(!mp.has(key)) mp.set(key,0);
    mp.set(key, mp.get(key)+1);
  }
  let res=[];
  for(const v of mp.values()) res.push(v);
  console.log(res.join(" "));`,
      PYTHON: `data=input().split()
  i=0
  n=int(data[i]); i+=1
  arr=data[i:i+n]
  mp={}
  for w in arr:
      key="".join(sorted(w))
      mp[key]=mp.get(key,0)+1
  print(" ".join(str(v) for v in mp.values()))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<string>a(n);
    for(int i=0;i<n;i++) cin>>a[i];
    unordered_map<string,int> mp;
    for(auto &w:a){
      string k=w;
      sort(k.begin(), k.end());
      mp[k]++;
    }
    bool first=true;
    for(auto &p:mp){
      if(!first) cout<<" ";
      first=false;
      cout<<p.second;
    }
  }`
    }
  },
  {
    title: "Reverse Vowels of a String",
    difficulty: "EASY",
    tags: ["String", "Two-Pointers", "Simulation", "Swapping"]    ,
    description: "Given a string, reverse only the vowels in it.",
    constraints: "1 <= length <= 10^5",
    hints: "Two pointers.",
    editorial: "Swap vowels from both ends.",
    testCases: [
      { input: "hello", output: "holle" },
      { input: "leetcode", output: "leotcede" }
    ],
    examples: {
      JAVASCRIPT: { input: "hello", output: "holle", explanation: "Swap e and o" },
      PYTHON: { input: "leetcode", output: "leotcede", explanation: "Reverse vowels" },
      CPP: { input: "aA", output: "Aa", explanation: "Case preserved" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  let s=fs.readFileSync(0,"utf8").trim().split("");
  const set=new Set("aeiouAEIOU".split(""));
  let l=0,r=s.length-1;
  while(l<r){
    while(l<r && !set.has(s[l])) l++;
    while(l<r && !set.has(s[r])) r--;
    if(l<r){ const t=s[l]; s[l]=s[r]; s[r]=t; l++; r--; }
  }
  console.log(s.join(""));`,
      PYTHON: `s=list(input().strip())
  v=set("aeiouAEIOU")
  l,r=0,len(s)-1
  while l<r:
      while l<r and s[l] not in v: l+=1
      while l<r and s[r] not in v: r-=1
      if l<r:
          s[l],s[r]=s[r],s[l]
          l+=1; r-=1
  print("".join(s))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    set<char> v={'a','e','i','o','u','A','E','I','O','U'};
    int l=0,r=s.size()-1;
    while(l<r){
      while(l<r && !v.count(s[l])) l++;
      while(l<r && !v.count(s[r])) r--;
      if(l<r) swap(s[l++], s[r--]);
    }
    cout<<s;
  }`
    }
  },
  {
    title: "Add Binary",
    difficulty: "EASY",
    tags: ["String", "Math", "Simulation", "Carry-Propagation"]    ,
    description: "Given two binary strings, return their sum as a binary string.",
    constraints: "1 <= length <= 10^5",
    hints: "Simulate addition from right.",
    editorial: "Carry-based addition.",
    testCases: [
      { input: "11 1", output: "100" },
      { input: "1010 1011", output: "10101" }
    ],
    examples: {
      JAVASCRIPT: { input: "11 1", output: "100", explanation: "3+1=4" },
      PYTHON: { input: "1010 1011", output: "10101", explanation: "10+11=21" },
      CPP: { input: "0 0", output: "0", explanation: "Zero" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  let [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  let i=a.length-1, j=b.length-1, carry=0, res="";
  while(i>=0 || j>=0 || carry){
    let s=carry;
    if(i>=0) s+=a.charCodeAt(i--)-48;
    if(j>=0) s+=b.charCodeAt(j--)-48;
    res = (s%2) + res;
    carry = Math.floor(s/2);
  }
  console.log(res);`,
      PYTHON: `a,b=input().split()
  i,j=len(a)-1,len(b)-1
  carry=0
  res=[]
  while i>=0 or j>=0 or carry:
      s=carry
      if i>=0: s+=ord(a[i])-48; i-=1
      if j>=0: s+=ord(b[j])-48; j-=1
      res.append(str(s%2))
      carry=s//2
  print("".join(reversed(res)))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string a,b; cin>>a>>b;
    int i=a.size()-1, j=b.size()-1, carry=0;
    string res="";
    while(i>=0 || j>=0 || carry){
      int s=carry;
      if(i>=0) s+=a[i--]-'0';
      if(j>=0) s+=b[j--]-'0';
      res.push_back(char('0'+(s%2)));
      carry=s/2;
    }
    reverse(res.begin(), res.end());
    cout<<res;
  }`
    }
  },
  {
    title: "Simplify Unix Path",
    difficulty: "MEDIUM",
    tags: ["String", "Stack", "Parsing", "Simulation", "Filesystem"]    ,
    description: "Given an absolute Unix-style file path, simplify it.",
    constraints: "1 <= length <= 10^5",
    hints: "Split by '/', use stack.",
    editorial: "Process tokens.",
    testCases: [
      { input: "/home//foo/", output: "/home/foo" },
      { input: "/a/./b/../../c/", output: "/c" }
    ],
    examples: {
      JAVASCRIPT: { input: "/a/./b/../../c/", output: "/c", explanation: "Resolve dots" },
      PYTHON: { input: "/../", output: "/", explanation: "Root stays" },
      CPP: { input: "/home/", output: "/home", explanation: "No change" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const path=fs.readFileSync(0,"utf8").trim();
  const parts=path.split("/");
  const st=[];
  for(const p of parts){
    if(p===""||p===".") continue;
    if(p===".."){ if(st.length) st.pop(); }
    else st.push(p);
  }
  console.log("/"+st.join("/"));`,
      PYTHON: `path=input().strip()
  parts=path.split("/")
  st=[]
  for p in parts:
      if p=="" or p==".":
          continue
      if p=="..":
          if st: st.pop()
      else:
          st.append(p)
  print("/"+"/".join(st))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string path; cin>>path;
    vector<string> st;
    string cur="";
    for(int i=0;i<=path.size();i++){
      if(i==path.size() || path[i]=='/'){
        if(cur==".."){
          if(!st.empty()) st.pop_back();
        } else if(cur!="" && cur!="."){
          st.push_back(cur);
        }
        cur="";
      } else cur.push_back(path[i]);
    }
    string res="/";
    for(int i=0;i<st.size();i++){
      if(i) res+="/";
      res+=st[i];
    }
    cout<<res;
  }`
    }
  },
  {
    title: "Longest Repeating Character Replacement",
    difficulty: "MEDIUM",
    tags: ["String", "Sliding-Window", "Frequency-Counting", "Two-Pointers", "Optimization"]    ,
    description: "Given a string and k, you can replace at most k characters. Find the length of the longest substring containing the same character.",
    constraints: "1 <= length <= 10^5",
    hints: "Sliding window with max frequency.",
    editorial: "Window valid if size - maxFreq <= k.",
    testCases: [
      { input: "ABAB 2", output: "4" },
      { input: "AABABBA 1", output: "4" }
    ],
    examples: {
      JAVASCRIPT: { input: "ABAB 2", output: "4", explanation: "Make all A or B" },
      PYTHON: { input: "AABABBA 1", output: "4", explanation: "Replace one" },
      CPP: { input: "AAAA 2", output: "4", explanation: "Already same" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const [s,ks]=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  const k=parseInt(ks);
  const cnt=new Array(26).fill(0);
  let l=0, maxf=0, ans=0;
  for(let r=0;r<s.length;r++){
    const idx=s.charCodeAt(r)-65;
    cnt[idx]++;
    maxf=Math.max(maxf, cnt[idx]);
    while((r-l+1)-maxf>k){
      cnt[s.charCodeAt(l)-65]--;
      l++;
    }
    ans=Math.max(ans, r-l+1);
  }
  console.log(ans);`,
      PYTHON: `s,k=input().split()
  k=int(k)
  cnt=[0]*26
  l=0; maxf=0; ans=0
  for r in range(len(s)):
      idx=ord(s[r])-65
      cnt[idx]+=1
      maxf=max(maxf, cnt[idx])
      while (r-l+1)-maxf>k:
          cnt[ord(s[l])-65]-=1
          l+=1
      ans=max(ans, r-l+1)
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; int k; cin>>s>>k;
    vector<int> cnt(26,0);
    int l=0, maxf=0, ans=0;
    for(int r=0;r<s.size();r++){
      int idx=s[r]-'A';
      cnt[idx]++;
      maxf=max(maxf, cnt[idx]);
      while((r-l+1)-maxf>k){
        cnt[s[l]-'A']--;
        l++;
      }
      ans=max(ans, r-l+1);
    }
    cout<<ans;
  }`
    }
  },
  {
    title: "Decode String",
    difficulty: "MEDIUM",
    tags: ["String", "Stack", "Parsing", "Decoding", "Simulation"]    ,
    description: "Given an encoded string like k[encoded_string], decode it.",
    constraints: "1 <= length <= 10^5",
    hints: "Use stacks.",
    editorial: "Stack of counts and strings.",
    testCases: [
      { input: "3[a]2[bc]", output: "aaabcbc" },
      { input: "3[a2[c]]", output: "accaccacc" }
    ],
    examples: {
      JAVASCRIPT: { input: "3[a]2[bc]", output: "aaabcbc", explanation: "Repeat blocks" },
      PYTHON: { input: "3[a2[c]]", output: "accaccacc", explanation: "Nested" },
      CPP: { input: "2[ab]", output: "abab", explanation: "Simple" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const s=fs.readFileSync(0,"utf8").trim();
  const cntStack=[], strStack=[];
  let cur="", num=0;
  for(const c of s){
    if(c>='0'&&c<='9'){
      num=num*10 + (c.charCodeAt(0)-48);
    } else if(c==='['){
      cntStack.push(num);
      strStack.push(cur);
      num=0; cur="";
    } else if(c===']'){
      const k=cntStack.pop();
      const prev=strStack.pop();
      cur = prev + cur.repeat(k);
    } else {
      cur += c;
    }
  }
  console.log(cur);`,
      PYTHON: `s=input().strip()
  cntStack=[]; strStack=[]
  cur=""; num=0
  for c in s:
      if c.isdigit():
          num=num*10 + int(c)
      elif c=='[':
          cntStack.append(num)
          strStack.append(cur)
          num=0; cur=""
      elif c==']':
          k=cntStack.pop()
          prev=strStack.pop()
          cur = prev + cur*k
      else:
          cur += c
  print(cur)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    stack<int> cnt;
    stack<string> st;
    string cur="";
    int num=0;
    for(char c:s){
      if(isdigit(c)){
        num = num*10 + (c-'0');
      } else if(c=='['){
        cnt.push(num);
        st.push(cur);
        num=0; cur="";
      } else if(c==']'){
        int k=cnt.top(); cnt.pop();
        string prev=st.top(); st.pop();
        string tmp="";
        for(int i=0;i<k;i++) tmp+=cur;
        cur = prev + tmp;
      } else {
        cur.push_back(c);
      }
    }
    cout<<cur;
  }`
    }
  },
  {
    title: "Isomorphic Strings",
    difficulty: "EASY",
    tags: ["String", "Hashing", "Mapping", "Pattern-Matching"],
    description: "Check if two strings are isomorphic.",
    constraints: "1 <= length <= 10^5",
    hints: "Two-way mapping.",
    editorial: "Maintain two maps.",
    testCases: [
      { input: "egg add", output: "true" },
      { input: "foo bar", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "egg add", output: "true", explanation: "e->a, g->d" },
      PYTHON: { input: "foo bar", output: "false", explanation: "Mapping breaks" },
      CPP: { input: "paper title", output: "true", explanation: "Valid mapping" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const [a,b]=require("fs").readFileSync(0,"utf8").trim().split(/\\s+/);
  if(a.length!==b.length){console.log("false");return;}
  const m1=new Map(), m2=new Map();
  for(let i=0;i<a.length;i++){
   if((m1.get(a[i])??b[i])!==b[i] || (m2.get(b[i])??a[i])!==a[i]){
     console.log("false"); return;
   }
   m1.set(a[i],b[i]); m2.set(b[i],a[i]);
  }
  console.log("true");`,
      PYTHON: `a,b=input().split()
  if len(a)!=len(b): print("false"); exit()
  m1={}; m2={}
  for i in range(len(a)):
      if (a[i] in m1 and m1[a[i]]!=b[i]) or (b[i] in m2 and m2[b[i]]!=a[i]):
          print("false"); exit()
      m1[a[i]]=b[i]; m2[b[i]]=a[i]
  print("true")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string a,b; cin>>a>>b;
   if(a.size()!=b.size()){ cout<<"false"; return 0; }
   unordered_map<char,char> m1,m2;
   for(int i=0;i<a.size();i++){
     if((m1.count(a[i]) && m1[a[i]]!=b[i]) || (m2.count(b[i]) && m2[b[i]]!=a[i])){
       cout<<"false"; return 0;
     }
     m1[a[i]]=b[i]; m2[b[i]]=a[i];
   }
   cout<<"true";
  }`
    }
  },
  {
    title: "Check String Rotation",
    difficulty: "EASY",
    tags: ["String", "Rotation", "Substring", "Trick"],
    description: "Check if one string is a rotation of another.",
    constraints: "1 <= length <= 10^5",
    hints: "Check s2 in s1+s1.",
    editorial: "Rotation trick.",
    testCases: [
      { input: "abcd cdab", output: "true" },
      { input: "abcd acbd", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "abcd cdab", output: "true", explanation: "Rotation" },
      PYTHON: { input: "abcd acbd", output: "false", explanation: "Not rotation" },
      CPP: { input: "a a", output: "true", explanation: "Same string" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const [a,b]=require("fs").readFileSync(0,"utf8").trim().split(/\\s+/);
  if(a.length!==b.length){ console.log("false"); }
  else console.log(((a+a).includes(b))?"true":"false");`,
      PYTHON: `a,b=input().split()
  if len(a)!=len(b): print("false")
  else: print("true" if b in (a+a) else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string a,b; cin>>a>>b;
   if(a.size()!=b.size()){ cout<<"false"; return 0; }
   cout<<((a+a).find(b)!=string::npos ? "true" : "false");
  }`
    }
  },
  {
    title: "Remove Adjacent Duplicates",
    difficulty: "EASY",
    tags: ["String", "Stack", "Simulation", "Deduplication"],
    description: "Remove all adjacent duplicate characters.",
    constraints: "1 <= length <= 10^5",
    hints: "Use stack.",
    editorial: "Simulate removals.",
    testCases: [
      { input: "abbaca", output: "ca" }
    ],
    examples: {
      JAVASCRIPT: { input: "abbaca", output: "ca", explanation: "bb and aa removed" },
      PYTHON: { input: "azxxzy", output: "ay", explanation: "xx and zz removed" },
      CPP: { input: "a", output: "a", explanation: "Single char" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  const st=[];
  for(const c of s){
    if(st.length && st[st.length-1]===c) st.pop();
    else st.push(c);
  }
  console.log(st.join(""));`,
      PYTHON: `s=input().strip()
  st=[]
  for c in s:
      if st and st[-1]==c: st.pop()
      else: st.append(c)
  print("".join(st))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s; cin>>s;
   string st;
   for(char c:s){
     if(!st.empty() && st.back()==c) st.pop_back();
     else st.push_back(c);
   }
   cout<<st;
  }`
    }
  },
  {
    title: "Count Binary Substrings",
    difficulty: "MEDIUM",
    tags: ["String", "Two-Pointers", "Grouping", "Counting"],
    description: "Count substrings with equal consecutive 0s and 1s.",
    constraints: "1 <= length <= 10^5",
    hints: "Group lengths.",
    editorial: "Sum min(prevGroup, currGroup).",
    testCases: [
      { input: "00110011", output: "6" }
    ],
    examples: {
      JAVASCRIPT: { input: "00110011", output: "6", explanation: "Valid substrings count" },
      PYTHON: { input: "10101", output: "4", explanation: "Alternating" },
      CPP: { input: "000111", output: "3", explanation: "min(3,3)" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  let prev=0,cur=1,ans=0;
  for(let i=1;i<s.length;i++){
    if(s[i]===s[i-1]) cur++;
    else{ ans+=Math.min(prev,cur); prev=cur; cur=1; }
  }
  ans+=Math.min(prev,cur);
  console.log(ans);`,
      PYTHON: `s=input().strip()
  prev=0; cur=1; ans=0
  for i in range(1,len(s)):
      if s[i]==s[i-1]: cur+=1
      else:
          ans+=min(prev,cur)
          prev=cur; cur=1
  ans+=min(prev,cur)
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s; cin>>s;
   int prev=0,cur=1,ans=0;
   for(int i=1;i<s.size();i++){
     if(s[i]==s[i-1]) cur++;
     else{
       ans+=min(prev,cur);
       prev=cur; cur=1;
     }
   }
   ans+=min(prev,cur);
   cout<<ans;
  }`
    }
  },
  {
    title: "Longest Common Prefix",
    difficulty: "EASY",
    tags: ["String", "Prefix", "Scanning", "Brute-Force"],
    description: "Find the longest common prefix among strings.",
    constraints: "1 <= n <= 10^4",
    hints: "Shrink prefix.",
    editorial: "Take first string and shrink.",
    testCases: [
      { input: "3\nflower flow flight", output: "fl" }
    ],
    examples: {
      JAVASCRIPT: { input: "3\nflower flow flight", output: "fl", explanation: "Common prefix" },
      PYTHON: { input: "2\ndog racecar", output: "", explanation: "None" },
      CPP: { input: "1\nabc", output: "abc", explanation: "Single" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  const n=parseInt(d[0]); const arr=d.slice(1);
  let pref=arr[0];
  for(let i=1;i<n;i++){
    while(!arr[i].startsWith(pref)){
      pref=pref.slice(0,-1);
      if(pref==="") break;
    }
  }
  console.log(pref);`,
      PYTHON: `data=input().split()
  n=int(data[0]); arr=data[1:]
  pref=arr[0]
  for s in arr[1:]:
      while not s.startswith(pref):
          pref=pref[:-1]
          if pref=="": break
  print(pref)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   int n; cin>>n;
   vector<string>a(n);
   for(auto &s:a) cin>>s;
   string pref=a[0];
   for(int i=1;i<n;i++){
     while(a[i].find(pref)!=0){
       pref.pop_back();
       if(pref.empty()) break;
     }
   }
   cout<<pref;
  }`
    }
  },
  {
    title: "Check If Subsequence",
    difficulty: "EASY",
    tags: ["String", "Two-Pointers", "Greedy", "Subsequence"],
    description: "Check if s is a subsequence of t.",
    constraints: "1 <= length <= 10^5",
    hints: "Two pointers.",
    editorial: "Scan both strings.",
    testCases: [
      { input: "abc ahbgdc", output: "true" },
      { input: "axc ahbgdc", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "abc ahbgdc", output: "true", explanation: "a,b,c appear in order" },
      PYTHON: { input: "axc ahbgdc", output: "false", explanation: "x missing" },
      CPP: { input: "a a", output: "true", explanation: "Same char" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const [s,t]=require("fs").readFileSync(0,"utf8").trim().split(/\\s+/);
  let i=0,j=0;
  while(i<s.length && j<t.length){
    if(s[i]===t[j]) i++;
    j++;
  }
  console.log(i===s.length?"true":"false");`,
      PYTHON: `s,t=input().split()
  i=j=0
  while i<len(s) and j<len(t):
      if s[i]==t[j]: i+=1
      j+=1
  print("true" if i==len(s) else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s,t; cin>>s>>t;
   int i=0,j=0;
   while(i<s.size() && j<t.size()){
     if(s[i]==t[j]) i++;
     j++;
   }
   cout<<(i==s.size()?"true":"false");
  }`
    }
  },
  {
    title: "Reverse Only Letters",
    difficulty: "EASY",
    tags: ["String", "Two-Pointers", "Filtering", "Simulation"],
    description: "Reverse only letters in the string, keep other characters in place.",
    constraints: "1 <= length <= 10^5",
    hints: "Two pointers skipping non-letters.",
    editorial: "Swap letters only.",
    testCases: [
      { input: "a-bC-dEf-ghIj", output: "j-Ih-gfE-dCba" }
    ],
    examples: {
      JAVASCRIPT: { input: "a-bC-dEf-ghIj", output: "j-Ih-gfE-dCba", explanation: "Only letters reversed" },
      PYTHON: { input: "ab-cd", output: "dc-ba", explanation: "Hyphen stays" },
      CPP: { input: "a", output: "a", explanation: "Single char" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim().split("");
  let i=0,j=s.length-1;
  const isLetter=c=>/[a-zA-Z]/.test(c);
  while(i<j){
    if(!isLetter(s[i])) i++;
    else if(!isLetter(s[j])) j--;
    else{ const t=s[i]; s[i]=s[j]; s[j]=t; i++; j--; }
  }
  console.log(s.join(""));`,
      PYTHON: `s=list(input().strip())
  i,j=0,len(s)-1
  import string
  def isL(c): return c.isalpha()
  while i<j:
      if not isL(s[i]): i+=1
      elif not isL(s[j]): j-=1
      else:
          s[i],s[j]=s[j],s[i]; i+=1; j-=1
  print("".join(s))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s; cin>>s;
   int i=0,j=s.size()-1;
   auto isL=[&](char c){ return isalpha(c); };
   while(i<j){
     if(!isL(s[i])) i++;
     else if(!isL(s[j])) j--;
     else{ swap(s[i],s[j]); i++; j--; }
   }
   cout<<s;
  }`
    }
  },
  {
    title: "Valid Anagram",
    difficulty: "EASY",
    tags: ["String", "Hashing", "Frequency-Counting", "Comparison"],
    description: "Check if two strings are anagrams.",
    constraints: "1 <= length <= 10^5",
    hints: "Count characters.",
    editorial: "Frequency map or array.",
    testCases: [
      { input: "anagram nagaram", output: "true" },
      { input: "rat car", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "anagram nagaram", output: "true", explanation: "Same letters" },
      PYTHON: { input: "rat car", output: "false", explanation: "Different letters" },
      CPP: { input: "a a", output: "true", explanation: "Same" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const [a,b]=require("fs").readFileSync(0,"utf8").trim().split(/\\s+/);
  if(a.length!==b.length){ console.log("false"); return; }
  const cnt=new Map();
  for(const c of a) cnt.set(c,(cnt.get(c)||0)+1);
  for(const c of b){
    if(!cnt.has(c)){ console.log("false"); return; }
    cnt.set(c,cnt.get(c)-1);
    if(cnt.get(c)===0) cnt.delete(c);
  }
  console.log(cnt.size===0?"true":"false");`,
      PYTHON: `from collections import Counter
  a,b=input().split()
  print("true" if Counter(a)==Counter(b) else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string a,b; cin>>a>>b;
   if(a.size()!=b.size()){ cout<<"false"; return 0; }
   vector<int> cnt(256,0);
   for(char c:a) cnt[c]++;
   for(char c:b) cnt[c]--;
   for(int x:cnt) if(x!=0){ cout<<"false"; return 0; }
   cout<<"true";
  }`
    }
  },
  {
    title: "Repeated Substring Pattern",
    difficulty: "EASY",
    tags: ["String", "Pattern", "Trick", "Substring"],
    description: "Check if the string can be formed by repeating a substring.",
    constraints: "1 <= length <= 10^5",
    hints: "Check in s+s trick.",
    editorial: "Remove first and last char from s+s and check.",
    testCases: [
      { input: "abab", output: "true" },
      { input: "aba", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "abab", output: "true", explanation: "ab repeated" },
      PYTHON: { input: "aba", output: "false", explanation: "Not repeat" },
      CPP: { input: "aaaa", output: "true", explanation: "a repeated" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  const t=(s+s).slice(1,-1);
  console.log(t.includes(s)?"true":"false");`,
      PYTHON: `s=input().strip()
  t=(s+s)[1:-1]
  print("true" if s in t else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s; cin>>s;
   string t=(s+s).substr(1, 2*s.size()-2);
   cout<<(t.find(s)!=string::npos ? "true" : "false");
  }`
    }
  },
  {
    title: "Valid Palindrome (Alphanumeric Only)",
    difficulty: "EASY",
    tags: ["String", "Two-Pointers", "Filtering", "Palindrome"],
    description: "Check if a string is palindrome considering only alphanumeric characters and ignoring case.",
    constraints: "1 <= length <= 10^5",
    hints: "Two pointers with filtering.",
    editorial: "Skip non-alphanumeric and compare.",
    testCases: [
      { input: "A man, a plan, a canal: Panama", output: "true" },
      { input: "race a car", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "A man, a plan, a canal: Panama", output: "true", explanation: "Valid palindrome" },
      PYTHON: { input: "race a car", output: "false", explanation: "Not palindrome" },
      CPP: { input: " ", output: "true", explanation: "Empty is palindrome" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  let i=0,j=s.length-1;
  const isA=c=>/[a-zA-Z0-9]/.test(c);
  while(i<j){
    while(i<j && !isA(s[i])) i++;
    while(i<j && !isA(s[j])) j--;
    if(s[i].toLowerCase()!==s[j].toLowerCase()){ console.log("false"); return; }
    i++; j--;
  }
  console.log("true");`,
      PYTHON: `s=input().strip()
  i,j=0,len(s)-1
  def ok(c): return c.isalnum()
  while i<j:
      while i<j and not ok(s[i]): i+=1
      while i<j and not ok(s[j]): j-=1
      if s[i].lower()!=s[j].lower():
          print("false"); exit()
      i+=1; j-=1
  print("true")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s; getline(cin,s);
   int i=0,j=s.size()-1;
   auto ok=[&](char c){ return isalnum(c); };
   while(i<j){
     while(i<j && !ok(s[i])) i++;
     while(i<j && !ok(s[j])) j--;
     if(tolower(s[i])!=tolower(s[j])){ cout<<"false"; return 0; }
     i++; j--;
   }
   cout<<"true";
  }`
    }
  },
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
]