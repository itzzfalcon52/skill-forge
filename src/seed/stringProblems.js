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
]