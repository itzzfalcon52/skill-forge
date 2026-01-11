export const dpProblems = [
    {
        title: "Fibonacci Number",
        difficulty: "EASY",
        tags: ["DP", "Math"],
        description: "Given n, print the nth Fibonacci number.",
        constraints: "0 <= n <= 45",
        hints: "Use DP or iterative two variables.",
        editorial: "Classic DP. Either memoize or compute iteratively in O(n).",
      
        testCases: [
          { input: "5", output: "5" },
          { input: "10", output: "55" },
          { input: "0", output: "0" }
        ],
      
        examples: {
          JAVASCRIPT: { input: "5", output: "5", explanation: "Sequence: 0 1 1 2 3 5" },
          PYTHON: { input: "10", output: "55", explanation: "10th Fibonacci is 55" },
          CPP: { input: "0", output: "0", explanation: "Base case" }
        },
      
        codeSnippets: {
          JAVASCRIPT: `const fs = require("fs");
      const n = parseInt(fs.readFileSync(0,"utf8").trim());
      console.log(0);`,
          PYTHON: `n = int(input())
      print(0)`,
          CPP: `#include <bits/stdc++.h>
      using namespace std;
      int main(){ int n; cin>>n; cout<<0; }`
        },
      
        referenceSolution: {
          JAVASCRIPT: `const fs = require("fs");
      const n = parseInt(fs.readFileSync(0,"utf8").trim());
      if(n===0){ console.log(0); return; }
      let a=0,b=1;
      for(let i=2;i<=n;i++){
        let c=a+b;
        a=b; b=c;
      }
      console.log(n===1?1:b);`,
          PYTHON: `n=int(input())
      if n==0:
          print(0)
      else:
          a,b=0,1
          for _ in range(2,n+1):
              a,b=b,a+b
          print(1 if n==1 else b)`,
          CPP: `#include <bits/stdc++.h>
      using namespace std;
      int main(){
        int n; cin>>n;
        if(n==0){ cout<<0; return 0; }
        long long a=0,b=1;
        for(int i=2;i<=n;i++){
          long long c=a+b;
          a=b; b=c;
        }
        cout<<(n==1?1:b);
      }`
        }
      },
      
      /* ============================================================
         2. Climbing Stairs
         ============================================================ */
      {
        title: "Climbing Stairs",
        difficulty: "EASY",
        tags: ["DP"],
        description: "You can climb 1 or 2 steps. In how many distinct ways can you reach the top?",
        constraints: "1 <= n <= 45",
        hints: "Same as Fibonacci.",
        editorial: "dp[n] = dp[n-1] + dp[n-2].",
      
        testCases: [
          { input: "2", output: "2" },
          { input: "3", output: "3" },
          { input: "5", output: "8" }
        ],
      
        examples: {
          JAVASCRIPT: { input: "3", output: "3", explanation: "1+1+1, 1+2, 2+1" },
          PYTHON: { input: "5", output: "8", explanation: "Fibonacci-like" },
          CPP: { input: "2", output: "2", explanation: "Two ways" }
        },
      
        codeSnippets: {
          JAVASCRIPT: `const n = parseInt(require("fs").readFileSync(0,"utf8"));
      console.log(0);`,
          PYTHON: `n=int(input()); print(0)`,
          CPP: `#include <bits/stdc++.h>
      using namespace std; int main(){ int n;cin>>n; cout<<0; }`
        },
      
        referenceSolution: {
          JAVASCRIPT: `const fs = require("fs");
      const n = parseInt(fs.readFileSync(0,"utf8"));
      if(n<=2){ console.log(n); return; }
      let a=1,b=2;
      for(let i=3;i<=n;i++){
        let c=a+b; a=b; b=c;
      }
      console.log(b);`,
          PYTHON: `n=int(input())
      if n<=2:
          print(n)
      else:
          a,b=1,2
          for _ in range(3,n+1):
              a,b=b,a+b
          print(b)`,
          CPP: `#include <bits/stdc++.h>
      using namespace std;
      int main(){
        int n; cin>>n;
        if(n<=2){ cout<<n; return 0; }
        long long a=1,b=2;
        for(int i=3;i<=n;i++){
          long long c=a+b; a=b; b=c;
        }
        cout<<b;
      }`
        }
      },
      
      /* ============================================================
         3. House Robber
         ============================================================ */
      {
        title: "House Robber",
        difficulty: "MEDIUM",
        tags: ["DP"],
        description: "You cannot rob adjacent houses. Max money?",
        constraints: "1 <= n <= 10^5",
        hints: "At each house choose rob or skip.",
        editorial: "dp[i] = max(dp[i-1], dp[i-2] + a[i])",
      
        testCases: [
          { input: "4\n1 2 3 1", output: "4" },
          { input: "5\n2 7 9 3 1", output: "12" }
        ],
      
        examples: {
          JAVASCRIPT: { input: "4\n1 2 3 1", output: "4", explanation: "Rob 1 + 3" },
          PYTHON: { input: "5\n2 7 9 3 1", output: "12", explanation: "Rob 2 + 9 + 1" },
          CPP: { input: "1\n10", output: "10", explanation: "Only one house" }
        },
      
        codeSnippets: {
          JAVASCRIPT: `// read input`,
          PYTHON: `# read input`,
          CPP: `// read input`
        },
      
        referenceSolution: {
          JAVASCRIPT: `const fs=require("fs");
      const arr=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
      const n=arr[0];
      const a=arr.slice(1);
      if(n===1){ console.log(a[0]); return; }
      let prev2=a[0], prev1=Math.max(a[0],a[1]);
      for(let i=2;i<n;i++){
        let cur=Math.max(prev1, prev2+a[i]);
        prev2=prev1; prev1=cur;
      }
      console.log(prev1);`,
          PYTHON: `data=list(map(int,input().split()))
      n=data[0]; a=data[1:]
      if n==1:
          print(a[0]); exit()
      prev2=a[0]
      prev1=max(a[0],a[1])
      for i in range(2,n):
          cur=max(prev1, prev2+a[i])
          prev2,prev1=prev1,cur
      print(prev1)`,
          CPP: `#include <bits/stdc++.h>
      using namespace std;
      int main(){
        int n; cin>>n;
        vector<long long>a(n);
        for(int i=0;i<n;i++) cin>>a[i];
        if(n==1){ cout<<a[0]; return 0; }
        long long prev2=a[0], prev1=max(a[0],a[1]);
        for(int i=2;i<n;i++){
          long long cur=max(prev1, prev2+a[i]);
          prev2=prev1; prev1=cur;
        }
        cout<<prev1;
      }`
        }
      },
      
      /* ============================================================
         4. Coin Change (Minimum Coins)
         ============================================================ */
      {
        title: "Coin Change (Minimum Coins)",
        difficulty: "MEDIUM",
        tags: ["DP"],
        description: "Find minimum coins to make amount.",
        constraints: "1 <= n, amount <= 10^4",
        hints: "Classic 1D DP.",
        editorial: "dp[x] = min(dp[x-c] + 1).",
      
        testCases: [
          { input: "3\n1 2 5\n11", output: "3" },
          { input: "1\n2\n3", output: "-1" }
        ],
      
        examples: {
          JAVASCRIPT: { input: "3\n1 2 5\n11", output: "3", explanation: "5+5+1" },
          PYTHON: { input: "1\n2\n3", output: "-1", explanation: "Impossible" },
          CPP: { input: "1\n1\n0", output: "0", explanation: "Zero amount" }
        },
      
        codeSnippets: {
          JAVASCRIPT: `// read input`,
          PYTHON: `# read input`,
          CPP: `// read input`
        },
      
        referenceSolution: {
          JAVASCRIPT: `const fs=require("fs");
      const data=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
      let idx=0;
      const n=data[idx++]; const coins=data.slice(idx,idx+n); idx+=n;
      const amount=data[idx];
      const dp=Array(amount+1).fill(1e9);
      dp[0]=0;
      for(let c of coins){
        for(let i=c;i<=amount;i++){
          dp[i]=Math.min(dp[i], dp[i-c]+1);
        }
      }
      console.log(dp[amount]>=1e9?-1:dp[amount]);`,
          PYTHON: `data=list(map(int,input().split()))
      n=data[0]
      coins=data[1:1+n]
      amount=data[1+n]
      dp=[10**9]*(amount+1)
      dp[0]=0
      for c in coins:
          for i in range(c, amount+1):
              dp[i]=min(dp[i], dp[i-c]+1)
      print(-1 if dp[amount]>=10**9 else dp[amount])`,
          CPP: `#include <bits/stdc++.h>
      using namespace std;
      int main(){
        int n; cin>>n;
        vector<int> coins(n);
        for(int i=0;i<n;i++) cin>>coins[i];
        int amount; cin>>amount;
        const int INF=1e9;
        vector<int> dp(amount+1, INF);
        dp[0]=0;
        for(int c:coins){
          for(int i=c;i<=amount;i++){
            dp[i]=min(dp[i], dp[i-c]+1);
          }
        }
        cout<<(dp[amount]>=INF?-1:dp[amount]);
      }`
        }
      },
      
      /* ============================================================
         5. Longest Increasing Subsequence
         ============================================================ */
      {
        title: "Longest Increasing Subsequence",
        difficulty: "HARD",
        tags: ["DP", "Binary Search"],
        description: "Find length of LIS.",
        constraints: "1 <= n <= 2*10^5",
        hints: "Patience sorting technique.",
        editorial: "Maintain array of tails using binary search.",
      
        testCases: [
          { input: "6\n10 9 2 5 3 7", output: "3" },
          { input: "8\n0 1 0 3 2 3 4 5", output: "6" }
        ],
      
        examples: {
          JAVASCRIPT: { input: "6\n10 9 2 5 3 7", output: "3", explanation: "2 5 7" },
          PYTHON: { input: "8\n0 1 0 3 2 3 4 5", output: "6", explanation: "0 1 2 3 4 5" },
          CPP: { input: "1\n5", output: "1", explanation: "Single element" }
        },
      
        codeSnippets: {
          JAVASCRIPT: `// read input`,
          PYTHON: `# read input`,
          CPP: `// read input`
        },
      
        referenceSolution: {
          JAVASCRIPT: `const fs=require("fs");
      const data=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
      const n=data[0];
      const a=data.slice(1);
      let tails=[];
      for(let x of a){
        let l=0,r=tails.length;
        while(l<r){
          let m=(l+r)>>1;
          if(tails[m]<x) l=m+1; else r=m;
        }
        tails[l]=x;
      }
      console.log(tails.length);`,
          PYTHON: `import bisect
      data=list(map(int,input().split()))
      n=data[0]
      a=data[1:]
      tails=[]
      for x in a:
          i=bisect.bisect_left(tails,x)
          if i==len(tails): tails.append(x)
          else: tails[i]=x
      print(len(tails))`,
          CPP: `#include <bits/stdc++.h>
      using namespace std;
      int main(){
        int n; cin>>n;
        vector<int>a(n);
        for(int i=0;i<n;i++) cin>>a[i];
        vector<int> tails;
        for(int x:a){
          auto it=lower_bound(tails.begin(), tails.end(), x);
          if(it==tails.end()) tails.push_back(x);
          else *it=x;
        }
        cout<<tails.size();
      }`
        }
      },
    /* ============================================================
   6. Unique Paths
   ============================================================ */
{
    title: "Unique Paths",
    difficulty: "MEDIUM",
    tags: ["DP", "Grid"],
    description: "A robot can move only right or down. Count unique paths from top-left to bottom-right.",
    constraints: "1 <= m, n <= 100",
    hints: "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
    editorial: "Classic grid DP counting paths.",
  
    testCases: [
      { input: "3 7", output: "28" },
      { input: "3 2", output: "3" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "3 7", output: "28", explanation: "28 paths" },
      PYTHON: { input: "3 2", output: "3", explanation: "3 ways" },
      CPP: { input: "1 1", output: "1", explanation: "Only one cell" }
    },
  
    codeSnippets: {
      JAVASCRIPT: `// read m, n`,
      PYTHON: `# read m, n`,
      CPP: `// read m, n`
    },
  
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const [m,n]=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  const dp=Array.from({length:m},()=>Array(n).fill(1));
  for(let i=1;i<m;i++){
    for(let j=1;j<n;j++){
      dp[i][j]=dp[i-1][j]+dp[i][j-1];
    }
  }
  console.log(dp[m-1][n-1]);`,
      PYTHON: `m,n=map(int,input().split())
  dp=[[1]*n for _ in range(m)]
  for i in range(1,m):
      for j in range(1,n):
          dp[i][j]=dp[i-1][j]+dp[i][j-1]
  print(dp[m-1][n-1])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int m,n; cin>>m>>n;
    vector<vector<long long>> dp(m, vector<long long>(n,1));
    for(int i=1;i<m;i++)
      for(int j=1;j<n;j++)
        dp[i][j]=dp[i-1][j]+dp[i][j-1];
    cout<<dp[m-1][n-1];
  }`
    }
  },
  
  /* ============================================================
     7. Unique Paths II (With Obstacles)
     ============================================================ */
  {
    title: "Unique Paths II",
    difficulty: "MEDIUM",
    tags: ["DP", "Grid"],
    description: "Same as Unique Paths but some cells are blocked (1 = obstacle).",
    constraints: "1 <= m, n <= 100",
    hints: "If obstacle, dp[i][j] = 0.",
    editorial: "Grid DP with blocked cells.",
  
    testCases: [
      { input: "3 3\n0 0 0\n0 1 0\n0 0 0", output: "2" },
      { input: "2 2\n1 0\n0 0", output: "0" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "3 3\n0 0 0\n0 1 0\n0 0 0", output: "2", explanation: "Two ways around obstacle" },
      PYTHON: { input: "2 2\n1 0\n0 0", output: "0", explanation: "Start blocked" },
      CPP: { input: "1 1\n0", output: "1", explanation: "Single cell" }
    },
  
    codeSnippets: {
      JAVASCRIPT: `// read grid`,
      PYTHON: `# read grid`,
      CPP: `// read grid`
    },
  
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const data=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let idx=0;
  const m=data[idx++], n=data[idx++];
  let grid=[];
  for(let i=0;i<m;i++) grid.push(data.slice(idx, idx+=n));
  const dp=Array.from({length:m},()=>Array(n).fill(0));
  if(grid[0][0]===1){ console.log(0); return; }
  dp[0][0]=1;
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(grid[i][j]===1){ dp[i][j]=0; continue; }
      if(i>0) dp[i][j]+=dp[i-1][j];
      if(j>0) dp[i][j]+=dp[i][j-1];
    }
  }
  console.log(dp[m-1][n-1]);`,
      PYTHON: `data=list(map(int,input().split()))
  m,n=data[0],data[1]
  grid=[]
  idx=2
  for _ in range(m):
      grid.append(data[idx:idx+n]); idx+=n
  dp=[[0]*n for _ in range(m)]
  if grid[0][0]==1:
      print(0); exit()
  dp[0][0]=1
  for i in range(m):
      for j in range(n):
          if grid[i][j]==1:
              dp[i][j]=0
              continue
          if i>0: dp[i][j]+=dp[i-1][j]
          if j>0: dp[i][j]+=dp[i][j-1]
  print(dp[m-1][n-1])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int m,n; cin>>m>>n;
    vector<vector<int>> grid(m, vector<int>(n));
    for(int i=0;i<m;i++) for(int j=0;j<n;j++) cin>>grid[i][j];
    vector<vector<long long>> dp(m, vector<long long>(n,0));
    if(grid[0][0]==1){ cout<<0; return 0; }
    dp[0][0]=1;
    for(int i=0;i<m;i++){
      for(int j=0;j<n;j++){
        if(grid[i][j]==1){ dp[i][j]=0; continue; }
        if(i>0) dp[i][j]+=dp[i-1][j];
        if(j>0) dp[i][j]+=dp[i][j-1];
      }
    }
    cout<<dp[m-1][n-1];
  }`
    }
  },
  
  /* ============================================================
     8. Partition Equal Subset Sum
     ============================================================ */
  {
    title: "Partition Equal Subset Sum",
    difficulty: "MEDIUM",
    tags: ["DP", "Knapsack"],
    description: "Check if array can be partitioned into two subsets with equal sum.",
    constraints: "1 <= n <= 200, 1 <= a[i] <= 100",
    hints: "Subset sum DP to target = total/2.",
    editorial: "Classic 0/1 knapsack boolean DP.",
  
    testCases: [
      { input: "4\n1 5 11 5", output: "true" },
      { input: "3\n1 2 3", output: "false" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "4\n1 5 11 5", output: "true", explanation: "11 = 5+5+1" },
      PYTHON: { input: "3\n1 2 3", output: "false", explanation: "Cannot split equally" },
      CPP: { input: "1\n2", output: "false", explanation: "Single element" }
    },
  
    codeSnippets: {
      JAVASCRIPT: `// read input`,
      PYTHON: `# read input`,
      CPP: `// read input`
    },
  
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const data=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  const n=data[0];
  const a=data.slice(1);
  const sum=a.reduce((x,y)=>x+y,0);
  if(sum%2!==0){ console.log("false"); return; }
  const target=sum/2;
  const dp=Array(target+1).fill(false);
  dp[0]=true;
  for(let x of a){
    for(let s=target;s>=x;s--){
      dp[s]=dp[s]||dp[s-x];
    }
  }
  console.log(dp[target]?"true":"false");`,
      PYTHON: `data=list(map(int,input().split()))
  n=data[0]
  a=data[1:]
  s=sum(a)
  if s%2!=0:
      print("false"); exit()
  target=s//2
  dp=[False]*(target+1)
  dp[0]=True
  for x in a:
      for t in range(target, x-1, -1):
          dp[t]=dp[t] or dp[t-x]
  print("true" if dp[target] else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int>a(n);
    for(int i=0;i<n;i++) cin>>a[i];
    int s=accumulate(a.begin(),a.end(),0);
    if(s%2){ cout<<"false"; return 0; }
    int target=s/2;
    vector<bool> dp(target+1,false);
    dp[0]=true;
    for(int x:a){
      for(int t=target;t>=x;t--){
        dp[t]=dp[t]||dp[t-x];
      }
    }
    cout<<(dp[target]?"true":"false");
  }`
    }
  },
  
  /* ============================================================
     9. Decode Ways
     ============================================================ */
  {
    title: "Decode Ways",
    difficulty: "MEDIUM",
    tags: ["DP", "String"],
    description: "Digits represent letters 1-26. Count ways to decode.",
    constraints: "1 <= s.length <= 10^5",
    hints: "dp[i] from dp[i-1] and dp[i-2].",
    editorial: "Carefully handle zeros.",
  
    testCases: [
      { input: "12", output: "2" },
      { input: "06", output: "0" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "226", output: "3", explanation: "BZ, VF, BBF" },
      PYTHON: { input: "10", output: "1", explanation: "Only J" },
      CPP: { input: "0", output: "0", explanation: "Invalid" }
    },
  
    codeSnippets: {
      JAVASCRIPT: `// read string`,
      PYTHON: `# read string`,
      CPP: `// read string`
    },
  
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  if(s[0]==='0'){ console.log(0); return; }
  let prev2=1, prev1=1;
  for(let i=1;i<s.length;i++){
    let cur=0;
    if(s[i]!=='0') cur+=prev1;
    const two=parseInt(s.slice(i-1,i+1));
    if(two>=10 && two<=26) cur+=prev2;
    prev2=prev1;
    prev1=cur;
  }
  console.log(prev1);`,
      PYTHON: `s=input().strip()
  if s[0]=='0':
      print(0); exit()
  prev2,prev1=1,1
  for i in range(1,len(s)):
      cur=0
      if s[i]!='0':
          cur+=prev1
      two=int(s[i-1:i+1])
      if 10<=two<=26:
          cur+=prev2
      prev2,prev1=prev1,cur
  print(prev1)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string s; cin>>s;
    if(s[0]=='0'){ cout<<0; return 0; }
    long long prev2=1, prev1=1;
    for(int i=1;i<s.size();i++){
      long long cur=0;
      if(s[i]!='0') cur+=prev1;
      int two=(s[i-1]-'0')*10+(s[i]-'0');
      if(two>=10 && two<=26) cur+=prev2;
      prev2=prev1; prev1=cur;
    }
    cout<<prev1;
  }`
    }
  },
  
  /* ============================================================
     10. Edit Distance
     ============================================================ */
  {
    title: "Edit Distance",
    difficulty: "HARD",
    tags: ["DP", "String"],
    description: "Minimum operations to convert string A to B.",
    constraints: "1 <= |A|,|B| <= 2000",
    hints: "Classic DP on strings.",
    editorial: "dp[i][j] = min(insert, delete, replace).",
  
    testCases: [
      { input: "horse ros", output: "3" },
      { input: "intention execution", output: "5" }
    ],
  
    examples: {
      JAVASCRIPT: { input: "horse ros", output: "3", explanation: "3 operations" },
      PYTHON: { input: "a b", output: "1", explanation: "Replace" },
      CPP: { input: "abc abc", output: "0", explanation: "Same string" }
    },
  
    codeSnippets: {
      JAVASCRIPT: `// read strings`,
      PYTHON: `# read strings`,
      CPP: `// read strings`
    },
  
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  const n=a.length, m=b.length;
  const dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=0;i<=n;i++) dp[i][0]=i;
  for(let j=0;j<=m;j++) dp[0][j]=j;
  for(let i=1;i<=n;i++){
    for(let j=1;j<=m;j++){
      if(a[i-1]===b[j-1]) dp[i][j]=dp[i-1][j-1];
      else dp[i][j]=1+Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    }
  }
  console.log(dp[n][m]);`,
      PYTHON: `a,b=input().split()
  n,m=len(a),len(b)
  dp=[[0]*(m+1) for _ in range(n+1)]
  for i in range(n+1): dp[i][0]=i
  for j in range(m+1): dp[0][j]=j
  for i in range(1,n+1):
      for j in range(1,m+1):
          if a[i-1]==b[j-1]:
              dp[i][j]=dp[i-1][j-1]
          else:
              dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
  print(dp[n][m])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string a,b; cin>>a>>b;
    int n=a.size(), m=b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1));
    for(int i=0;i<=n;i++) dp[i][0]=i;
    for(int j=0;j<=m;j++) dp[0][j]=j;
    for(int i=1;i<=n;i++){
      for(int j=1;j<=m;j++){
        if(a[i-1]==b[j-1]) dp[i][j]=dp[i-1][j-1];
        else dp[i][j]=1+min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
      }
    }
    cout<<dp[n][m];
  }`
    }
  }
]