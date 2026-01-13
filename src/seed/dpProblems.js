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
  },
  {
    title: "Maximum Subarray Sum",
    difficulty: "EASY",
    tags: ["DP"],
    description: "Given an array, find the maximum sum of any contiguous subarray.",
    constraints: "1 <= n <= 10^5",
    hints: "Kadane's algorithm.",
    editorial: "Keep best subarray ending at each index.",
    testCases: [
      { input: "5\n-2 1 -3 4 -1", output: "4" },
      { input: "3\n-1 -2 -3", output: "-1" }
    ],
    examples: {
      JAVASCRIPT: { input: "5\n-2 1 -3 4 -1", output: "4", explanation: "Subarray [4]" },
      PYTHON: { input: "3\n-1 -2 -3", output: "-1", explanation: "Pick max element" },
      CPP: { input: "4\n1 2 3 4", output: "10", explanation: "Whole array" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const data = fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  const n=data[0];
  const a=data.slice(1);
  let best=a[0], cur=a[0];
  for(let i=1;i<n;i++){
    cur=Math.max(a[i], cur+a[i]);
    best=Math.max(best, cur);
  }
  console.log(best);`,
      PYTHON: `data=list(map(int,input().split()))
  n=data[0]
  a=data[1:]
  best=cur=a[0]
  for i in range(1,n):
      cur=max(a[i], cur+a[i])
      best=max(best, cur)
  print(best)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<long long>a(n);
    for(int i=0;i<n;i++) cin>>a[i];
    long long best=a[0], cur=a[0];
    for(int i=1;i<n;i++){
      cur=max(a[i], cur+a[i]);
      best=max(best, cur);
    }
    cout<<best;
  }`
    }
  },
  {
    title: "Partition Equal Subset Sum",
    difficulty: "MEDIUM",
    tags: ["DP"],
    description: "Given an array, determine if it can be partitioned into two subsets with equal sum.",
    constraints: "1 <= n <= 200, sum <= 20000",
    hints: "Subset sum DP.",
    editorial: "Check if sum/2 is achievable.",
    testCases: [
      { input: "4\n1 5 11 5", output: "true" },
      { input: "3\n1 2 3", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "4\n1 5 11 5", output: "true", explanation: "11 = 5+5+1" },
      PYTHON: { input: "3\n1 2 3", output: "false", explanation: "Cannot split" },
      CPP: { input: "1\n2", output: "false", explanation: "Single element" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const data = fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  const n=data[0];
  const a=data.slice(1);
  const sum=a.reduce((x,y)=>x+y,0);
  if(sum%2!==0){ console.log("false"); return; }
  const target=sum/2;
  const dp=new Array(target+1).fill(false);
  dp[0]=true;
  for(const v of a){
    for(let s=target;s>=v;s--){
      dp[s]=dp[s] || dp[s-v];
    }
  }
  console.log(dp[target] ? "true" : "false");`,
      PYTHON: `data=list(map(int,input().split()))
  n=data[0]
  a=data[1:]
  s=sum(a)
  if s%2!=0:
      print("false")
  else:
      target=s//2
      dp=[False]*(target+1)
      dp[0]=True
      for v in a:
          for x in range(target, v-1, -1):
              dp[x]=dp[x] or dp[x-v]
      print("true" if dp[target] else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int>a(n);
    for(int i=0;i<n;i++) cin>>a[i];
    int sum=0;
    for(int x:a) sum+=x;
    if(sum%2!=0){ cout<<"false"; return 0; }
    int target=sum/2;
    vector<bool> dp(target+1,false);
    dp[0]=true;
    for(int v:a){
      for(int s=target;s>=v;s--){
        dp[s]=dp[s] || dp[s-v];
      }
    }
    cout<<(dp[target]?"true":"false");
  }`
    }
  },
  {
    title: "Count Bits",
    difficulty: "EASY",
    tags: ["DP", "Bit Manipulation"],
    description: "Given n, for every number i from 0 to n, print the number of set bits in i.",
    constraints: "0 <= n <= 10^5",
    hints: "dp[i] = dp[i >> 1] + (i & 1)",
    editorial: "Reuse previous results.",
    testCases: [
      { input: "5", output: "0 1 1 2 1 2" },
      { input: "0", output: "0" }
    ],
    examples: {
      JAVASCRIPT: { input: "5", output: "0 1 1 2 1 2", explanation: "Count bits from 0 to 5" },
      PYTHON: { input: "0", output: "0", explanation: "Only zero" },
      CPP: { input: "2", output: "0 1 1", explanation: "0,1,2" }
    },
    codeSnippets: {
      JAVASCRIPT: `// stub`,
      PYTHON: `# stub`,
      CPP: `// stub`
    },
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const n = parseInt(fs.readFileSync(0,"utf8"));
  const dp=new Array(n+1).fill(0);
  for(let i=1;i<=n;i++){
    dp[i]=dp[i>>1] + (i&1);
  }
  console.log(dp.join(" "));`,
      PYTHON: `n=int(input())
  dp=[0]*(n+1)
  for i in range(1,n+1):
      dp[i]=dp[i>>1] + (i&1)
  print(" ".join(map(str,dp)))`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int> dp(n+1,0);
    for(int i=1;i<=n;i++){
      dp[i]=dp[i>>1] + (i&1);
    }
    for(int i=0;i<=n;i++){
      if(i) cout<<" ";
      cout<<dp[i];
    }
  }`
    }
  },
  {
    title: "Jump Game",
    difficulty: "MEDIUM",
    tags: ["DP", "Greedy"],
    description: "Given an array where each element represents maximum jump length from that position, determine if you can reach the last index.",
    constraints: "1 <= n <= 10^5",
    hints: "Track farthest reachable index.",
    editorial: "Greedy or DP: keep updating maxReach.",
    testCases: [
      { input: "5\n2 3 1 1 4", output: "true" },
      { input: "5\n3 2 1 0 4", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "5\n2 3 1 1 4", output: "true", explanation: "Reach end" },
      PYTHON: { input: "5\n3 2 1 0 4", output: "false", explanation: "Stuck at 0" },
      CPP: { input: "1\n0", output: "true", explanation: "Already at end" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const data=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  const n=data[0], a=data.slice(1);
  let maxReach=0;
  for(let i=0;i<n;i++){
    if(i>maxReach){ console.log("false"); return; }
    maxReach=Math.max(maxReach, i+a[i]);
  }
  console.log("true");`,
      PYTHON: `data=list(map(int,input().split()))
  n=data[0]; a=data[1:]
  maxReach=0
  ok=True
  for i in range(n):
      if i>maxReach:
          ok=False; break
      maxReach=max(maxReach, i+a[i])
  print("true" if ok else "false")`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int>a(n);
    for(int i=0;i<n;i++) cin>>a[i];
    int maxReach=0;
    for(int i=0;i<n;i++){
      if(i>maxReach){ cout<<"false"; return 0; }
      maxReach=max(maxReach, i+a[i]);
    }
    cout<<"true";
  }`
    }
  },
  {
    title: "Minimum Jumps to Reach End",
    difficulty: "MEDIUM",
    tags: ["DP", "Greedy"],
    description: "Given an array where each element represents maximum jump length, find minimum number of jumps to reach last index.",
    constraints: "1 <= n <= 10^5",
    hints: "Greedy level BFS style.",
    editorial: "Track current range and farthest.",
    testCases: [
      { input: "5\n2 3 1 1 4", output: "2" },
      { input: "1\n0", output: "0" }
    ],
    examples: {
      JAVASCRIPT: { input: "5\n2 3 1 1 4", output: "2", explanation: "0->1->4" },
      PYTHON: { input: "1\n0", output: "0", explanation: "Already there" },
      CPP: { input: "4\n1 1 1 1", output: "3", explanation: "Jump every step" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const data=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  const n=data[0], a=data.slice(1);
  if(n<=1){ console.log(0); return; }
  let jumps=0, curEnd=0, far=0;
  for(let i=0;i<n-1;i++){
    far=Math.max(far, i+a[i]);
    if(i===curEnd){
      jumps++;
      curEnd=far;
    }
  }
  console.log(jumps);`,
      PYTHON: `data=list(map(int,input().split()))
  n=data[0]; a=data[1:]
  if n<=1:
      print(0)
  else:
      jumps=0; curEnd=0; far=0
      for i in range(n-1):
          far=max(far, i+a[i])
          if i==curEnd:
              jumps+=1
              curEnd=far
      print(jumps)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int>a(n);
    for(int i=0;i<n;i++) cin>>a[i];
    if(n<=1){ cout<<0; return 0; }
    int jumps=0, curEnd=0, far=0;
    for(int i=0;i<n-1;i++){
      far=max(far, i+a[i]);
      if(i==curEnd){
        jumps++;
        curEnd=far;
      }
    }
    cout<<jumps;
  }`
    }
  },
  {
    title: "Coin Change Ways",
    difficulty: "MEDIUM",
    tags: ["DP"],
    description: "Given coin denominations and a target amount, count number of ways to make the amount using unlimited coins.",
    constraints: "1 <= n <= 100, amount <= 10^4",
    hints: "Unbounded knapsack counting.",
    editorial: "dp[x] += dp[x-coin]",
    testCases: [
      { input: "3\n1 2 5\n5", output: "4" },
      { input: "1\n2\n3", output: "0" }
    ],
    examples: {
      JAVASCRIPT: { input: "3\n1 2 5\n5", output: "4", explanation: "Combinations" },
      PYTHON: { input: "1\n2\n3", output: "0", explanation: "Impossible" },
      CPP: { input: "1\n1\n0", output: "1", explanation: "Empty way" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0;
  const n=d[i++]; const coins=d.slice(i,i+n); i+=n; const amount=d[i];
  const dp=new Array(amount+1).fill(0); dp[0]=1;
  for(const c of coins){
    for(let x=c;x<=amount;x++){
      dp[x]+=dp[x-c];
    }
  }
  console.log(dp[amount]);`,
      PYTHON: `data=list(map(int,input().split()))
  i=0
  n=data[i]; i+=1
  coins=data[i:i+n]; i+=n
  amount=data[i]
  dp=[0]*(amount+1); dp[0]=1
  for c in coins:
      for x in range(c, amount+1):
          dp[x]+=dp[x-c]
  print(dp[amount])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int> coins(n);
    for(int i=0;i<n;i++) cin>>coins[i];
    int amount; cin>>amount;
    vector<long long> dp(amount+1,0);
    dp[0]=1;
    for(int c: coins){
      for(int x=c;x<=amount;x++){
        dp[x]+=dp[x-c];
      }
    }
    cout<<dp[amount];
  }`
    }
  },
  {
    title: "Edit Distance",
    difficulty: "HARD",
    tags: ["DP", "String"],
    description: "Given two strings, find the minimum number of insert, delete, or replace operations to convert one into another.",
    constraints: "1 <= length <= 2000",
    hints: "2D DP on prefixes.",
    editorial: "dp[i][j] = min ops for prefixes.",
    testCases: [
      { input: "horse ros", output: "3" },
      { input: "intention execution", output: "5" }
    ],
    examples: {
      JAVASCRIPT: { input: "horse ros", output: "3", explanation: "horse -> ros" },
      PYTHON: { input: "a a", output: "0", explanation: "Same" },
      CPP: { input: "abc ab", output: "1", explanation: "Delete c" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
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
  n=len(a); m=len(b)
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
    vector<vector<int>> dp(n+1, vector<int>(m+1,0));
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
  },
  {
    title: "Longest Common Subsequence",
    difficulty: "MEDIUM",
    tags: ["DP", "String"],
    description: "Given two strings, find the length of their longest common subsequence.",
    constraints: "1 <= length <= 2000",
    hints: "2D DP on prefixes.",
    editorial: "dp[i][j] = LCS of prefixes.",
    testCases: [
      { input: "abcde ace", output: "3" },
      { input: "abc def", output: "0" }
    ],
    examples: {
      JAVASCRIPT: { input: "abcde ace", output: "3", explanation: "ace" },
      PYTHON: { input: "abc abc", output: "3", explanation: "Whole string" },
      CPP: { input: "a b", output: "0", explanation: "No common" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  const n=a.length, m=b.length;
  const dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=1;i<=n;i++){
    for(let j=1;j<=m;j++){
      if(a[i-1]===b[j-1]) dp[i][j]=dp[i-1][j-1]+1;
      else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  console.log(dp[n][m]);`,
      PYTHON: `a,b=input().split()
  n=len(a); m=len(b)
  dp=[[0]*(m+1) for _ in range(n+1)]
  for i in range(1,n+1):
      for j in range(1,m+1):
          if a[i-1]==b[j-1]:
              dp[i][j]=dp[i-1][j-1]+1
          else:
              dp[i][j]=max(dp[i-1][j], dp[i][j-1])
  print(dp[n][m])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    string a,b; cin>>a>>b;
    int n=a.size(), m=b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1,0));
    for(int i=1;i<=n;i++){
      for(int j=1;j<=m;j++){
        if(a[i-1]==b[j-1]) dp[i][j]=dp[i-1][j-1]+1;
        else dp[i][j]=max(dp[i-1][j], dp[i][j-1]);
      }
    }
    cout<<dp[n][m];
  }`
    }
  },
  {
    title: "0/1 Knapsack",
    difficulty: "MEDIUM",
    tags: ["DP", "Knapsack", "0/1", "Optimization", "Subset", "1D-DP"],
    description: "Given weights and values of items and a capacity W, find the maximum value you can obtain by selecting items at most once.",
    constraints: "1 <= n <= 200, 1 <= W <= 10000",
    hints: "Classic 0/1 DP on capacity.",
    editorial: "dp[w] = max(dp[w], dp[w-weight[i]] + value[i]) iterating w backwards.",
    testCases: [
      { input: "3\n3 4 5\n30 50 60\n8", output: "90" },
      { input: "2\n1 2\n10 15\n1", output: "10" }
    ],
    examples: {
      JAVASCRIPT: { input: "3\n3 4 5\n30 50 60\n8", output: "90", explanation: "Pick items with weights 3 and 5" },
      PYTHON: { input: "2\n1 2\n10 15\n1", output: "10", explanation: "Only first item fits" },
      CPP: { input: "1\n5\n10\n4", output: "0", explanation: "Nothing fits" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0;
  const n=d[i++]; const wt=d.slice(i,i+n); i+=n;
  const val=d.slice(i,i+n); i+=n;
  const W=d[i];
  const dp=new Array(W+1).fill(0);
  for(let k=0;k<n;k++){
    for(let w=W; w>=wt[k]; w--){
      dp[w]=Math.max(dp[w], dp[w-wt[k]] + val[k]);
    }
  }
  console.log(dp[W]);`,
      PYTHON: `data=list(map(int,input().split()))
  i=0
  n=data[i]; i+=1
  wt=data[i:i+n]; i+=n
  val=data[i:i+n]; i+=n
  W=data[i]
  dp=[0]*(W+1)
  for k in range(n):
      for w in range(W, wt[k]-1, -1):
          dp[w]=max(dp[w], dp[w-wt[k]]+val[k])
  print(dp[W])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int> wt(n), val(n);
    for(int i=0;i<n;i++) cin>>wt[i];
    for(int i=0;i<n;i++) cin>>val[i];
    int W; cin>>W;
    vector<int> dp(W+1,0);
    for(int k=0;k<n;k++){
      for(int w=W; w>=wt[k]; w--){
        dp[w]=max(dp[w], dp[w-wt[k]] + val[k]);
      }
    }
    cout<<dp[W];
  }`
    }
  },
  {
    title: "Rod Cutting",
    difficulty: "MEDIUM",
    tags: ["DP", "Unbounded-Knapsack", "Optimization", "1D-DP", "Partitioning"]    ,
    description: "Given prices of rods of length 1..n, find the maximum revenue obtainable by cutting up the rod of length n.",
    constraints: "1 <= n <= 1000",
    hints: "Unbounded knapsack style DP.",
    editorial: "dp[i] = max over j<=i of price[j] + dp[i-j].",
    testCases: [
      { input: "4\n1 5 8 9", output: "10" },
      { input: "3\n2 5 7", output: "7" }
    ],
    examples: {
      JAVASCRIPT: { input: "4\n1 5 8 9", output: "10", explanation: "2+2 cuts" },
      PYTHON: { input: "3\n2 5 7", output: "7", explanation: "No cut" },
      CPP: { input: "1\n5", output: "5", explanation: "Single piece" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0;
  const n=d[i++]; const price=d.slice(i,i+n);
  const dp=new Array(n+1).fill(0);
  for(let len=1; len<=n; len++){
    for(let cut=1; cut<=len; cut++){
      dp[len]=Math.max(dp[len], price[cut-1] + dp[len-cut]);
    }
  }
  console.log(dp[n]);`,
      PYTHON: `data=list(map(int,input().split()))
  i=0
  n=data[i]; i+=1
  price=data[i:i+n]
  dp=[0]*(n+1)
  for l in range(1,n+1):
      for c in range(1,l+1):
          dp[l]=max(dp[l], price[c-1] + dp[l-c])
  print(dp[n])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int> price(n);
    for(int i=0;i<n;i++) cin>>price[i];
    vector<int> dp(n+1,0);
    for(int len=1; len<=n; len++){
      for(int cut=1; cut<=len; cut++){
        dp[len]=max(dp[len], price[cut-1] + dp[len-cut]);
      }
    }
    cout<<dp[n];
  }`
    }
  },
  {
    title: "Matrix Chain Multiplication",
    difficulty: "HARD",
    tags: ["DP", "Interval-DP", "Partition-DP", "Optimization", "Classic"]    ,
    description: "Given dimensions of matrices, find the minimum number of scalar multiplications needed to multiply the chain.",
    constraints: "1 <= n <= 500",
    hints: "Interval DP.",
    editorial: "dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + cost.",
    testCases: [
      { input: "4\n10 20 30 40 30", output: "30000" },
      { input: "2\n10 20 30", output: "6000" }
    ],
    examples: {
      JAVASCRIPT: { input: "4\n10 20 30 40 30", output: "30000", explanation: "Optimal parenthesization" },
      PYTHON: { input: "2\n10 20 30", output: "6000", explanation: "Single multiplication" },
      CPP: { input: "1\n10 20", output: "0", explanation: "No multiplication" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0;
  const n=d[i++]; const arr=d.slice(i,i+n+1);
  const dp=Array.from({length:n+1},()=>Array(n+1).fill(0));
  for(let len=2; len<=n; len++){
    for(let l=1; l+len-1<=n; l++){
      const r=l+len-1;
      dp[l][r]=Infinity;
      for(let k=l; k<r; k++){
        const cost=dp[l][k]+dp[k+1][r]+arr[l-1]*arr[k]*arr[r];
        dp[l][r]=Math.min(dp[l][r], cost);
      }
    }
  }
  console.log(dp[1][n]);`,
      PYTHON: `data=list(map(int,input().split()))
  i=0
  n=data[i]; i+=1
  arr=data[i:i+n+1]
  dp=[[0]*(n+1) for _ in range(n+1)]
  for l in range(2,n+1):
      for i in range(1,n-l+2):
          j=i+l-1
          dp[i][j]=10**18
          for k in range(i,j):
              dp[i][j]=min(dp[i][j], dp[i][k]+dp[k+1][j]+arr[i-1]*arr[k]*arr[j])
  print(dp[1][n])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<int> arr(n+1);
    for(int i=0;i<=n;i++) cin>>arr[i];
    const long long INF=LLONG_MAX/4;
    vector<vector<long long>> dp(n+1, vector<long long>(n+1,0));
    for(int len=2; len<=n; len++){
      for(int i=1; i+len-1<=n; i++){
        int j=i+len-1;
        dp[i][j]=INF;
        for(int k=i;k<j;k++){
          dp[i][j]=min(dp[i][j], dp[i][k]+dp[k+1][j]+1LL*arr[i-1]*arr[k]*arr[j]);
        }
      }
    }
    cout<<dp[1][n];
  }`
    }
  },
  {
    title: "Palindrome Partitioning - Minimum Cuts",
    difficulty: "HARD",
    tags: ["DP", "2D-DP", "Palindrome", "String", "Partition-DP", "Preprocessing"]    ,
    description: "Given a string, partition it into substrings such that every substring is a palindrome. Return the minimum number of cuts needed.",
    constraints: "1 <= length <= 2000",
    hints: "Precompute palindromes + DP on prefix.",
    editorial: "dp[i] = min cuts for prefix ending at i.",
    testCases: [
      { input: "aab", output: "1" },
      { input: "a", output: "0" }
    ],
    examples: {
      JAVASCRIPT: { input: "aab", output: "1", explanation: "aa | b" },
      PYTHON: { input: "a", output: "0", explanation: "Already palindrome" },
      CPP: { input: "ab", output: "1", explanation: "a | b" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const s=fs.readFileSync(0,"utf8").trim();
  const n=s.length;
  const pal=Array.from({length:n},()=>Array(n).fill(false));
  for(let i=n-1;i>=0;i--){
    for(let j=i;j<n;j++){
      if(s[i]===s[j] && (j-i<2 || pal[i+1][j-1])) pal[i][j]=true;
    }
  }
  const dp=new Array(n).fill(Infinity);
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
      if pal[0][i]:
          dp[i]=0
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
    vector<int> dp(n, 1e9);
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
    title: "Triangle Minimum Path Sum",
    difficulty: "MEDIUM",
    tags: ["DP", "Grid-DP", "Path-Planning", "Bottom-Up", "Optimization"]    ,
    description: "Given a triangle array, find the minimum path sum from top to bottom. You may move to adjacent numbers on the row below.",
    constraints: "1 <= rows <= 500",
    hints: "Bottom-up DP.",
    editorial: "dp from bottom row upward.",
    testCases: [
      { input: "4\n2\n3 4\n6 5 7\n4 1 8 3", output: "11" },
      { input: "1\n-10", output: "-10" }
    ],
    examples: {
      JAVASCRIPT: { input: "4\n2\n3 4\n6 5 7\n4 1 8 3", output: "11", explanation: "2+3+5+1" },
      PYTHON: { input: "1\n-10", output: "-10", explanation: "Single element" },
      CPP: { input: "2\n1\n2 3", output: "3", explanation: "1+2" }
    },
    codeSnippets: { JAVASCRIPT: `// stub`, PYTHON: `# stub`, CPP: `// stub` },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const lines=fs.readFileSync(0,"utf8").trim().split(/\\n+/);
  const n=parseInt(lines[0]);
  let tri=[];
  for(let i=1;i<=n;i++) tri.push(lines[i].trim().split(/\\s+/).map(Number));
  for(let i=n-2;i>=0;i--){
    for(let j=0;j<=i;j++){
      tri[i][j]+=Math.min(tri[i+1][j], tri[i+1][j+1]);
    }
  }
  console.log(tri[0][0]);`,
      PYTHON: `import sys
  data=sys.stdin.read().strip().splitlines()
  n=int(data[0])
  tri=[list(map(int,data[i+1].split())) for i in range(n)]
  for i in range(n-2,-1,-1):
      for j in range(i+1):
          tri[i][j]+=min(tri[i+1][j], tri[i+1][j+1])
  print(tri[0][0])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
    int n; cin>>n;
    vector<vector<int>> tri(n);
    for(int i=0;i<n;i++){
      tri[i].resize(i+1);
      for(int j=0;j<=i;j++) cin>>tri[i][j];
    }
    for(int i=n-2;i>=0;i--){
      for(int j=0;j<=i;j++){
        tri[i][j]+=min(tri[i+1][j], tri[i+1][j+1]);
      }
    }
    cout<<tri[0][0];
  }`
    }
  },
  {
    title: "Longest Palindromic Subsequence",
    difficulty: "MEDIUM",
    tags: ["DP", "2D-DP", "String", "Palindrome", "Subsequence"],
    description: "Given a string, find the length of the longest subsequence that is also a palindrome.",
    constraints: "1 <= length <= 2000",
    hints: "Compare both ends, shrink window.",
    editorial: "dp[l][r] = if s[l]==s[r] then 2+dp[l+1][r-1] else max(dp[l+1][r], dp[l][r-1]).",
    testCases: [
      { input: "bbbab", output: "4" },
      { input: "cbbd", output: "2" }
    ],
    examples: {
      JAVASCRIPT: { input: "bbbab", output: "4", explanation: "bbbb" },
      PYTHON: { input: "cbbd", output: "2", explanation: "bb" },
      CPP: { input: "a", output: "1", explanation: "Single char" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  const n=s.length;
  const dp=Array.from({length:n},()=>Array(n).fill(0));
  for(let i=n-1;i>=0;i--){
    dp[i][i]=1;
    for(let j=i+1;j<n;j++){
      if(s[i]===s[j]) dp[i][j]=2+(i+1<=j-1?dp[i+1][j-1]:0);
      else dp[i][j]=Math.max(dp[i+1][j], dp[i][j-1]);
    }
  }
  console.log(n?dp[0][n-1]:0);`,
      PYTHON: `s=input().strip()
  n=len(s)
  dp=[[0]*n for _ in range(n)]
  for i in range(n-1,-1,-1):
      dp[i][i]=1
      for j in range(i+1,n):
          if s[i]==s[j]:
              dp[i][j]=2+(dp[i+1][j-1] if i+1<=j-1 else 0)
          else:
              dp[i][j]=max(dp[i+1][j], dp[i][j-1])
  print(dp[0][n-1] if n else 0)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s; if(!(cin>>s)){cout<<0;return 0;}
   int n=s.size();
   vector<vector<int>> dp(n, vector<int>(n,0));
   for(int i=n-1;i>=0;i--){
     dp[i][i]=1;
     for(int j=i+1;j<n;j++){
       if(s[i]==s[j]) dp[i][j]=2+(i+1<=j-1?dp[i+1][j-1]:0);
       else dp[i][j]=max(dp[i+1][j], dp[i][j-1]);
     }
   }
   cout<<dp[0][n-1];
  }`
    }
  },
  {
    title: "Count Subsets With Given Sum",
    difficulty: "MEDIUM",
    tags: ["DP", "Knapsack", "Subset", "Counting", "1D-DP"],
    description: "Given an array and a target sum, count number of subsets whose sum equals target.",
    constraints: "1 <= n <= 100, sum <= 10000",
    hints: "Knapsack counting DP.",
    editorial: "dp[s] += dp[s - a[i]]",
    testCases: [
      { input: "4\n1 2 3 3\n6", output: "3" }
    ],
    examples: {
      JAVASCRIPT: { input: "4\n1 2 3 3\n6", output: "3", explanation: "Subsets: [1,2,3], [3,3], [1,2,3]" },
      PYTHON: { input: "3\n1 1 1\n2", output: "3", explanation: "Choose any 2 ones" },
      CPP: { input: "1\n5\n5", output: "1", explanation: "Single element" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0,n=d[i++]; const a=d.slice(i,i+n); i+=n; const S=d[i];
  const dp=Array(S+1).fill(0); dp[0]=1;
  for(const x of a){
    for(let s=S;s>=x;s--) dp[s]+=dp[s-x];
  }
  console.log(dp[S]);`,
      PYTHON: `n=int(input()); a=list(map(int,input().split())); S=int(input())
  dp=[0]*(S+1); dp[0]=1
  for x in a:
      for s in range(S, x-1, -1):
          dp[s]+=dp[s-x]
  print(dp[S])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   int n; cin>>n;
   vector<int>a(n); for(int&i:a)cin>>i;
   int S; cin>>S;
   vector<long long> dp(S+1,0); dp[0]=1;
   for(int x:a){
     for(int s=S;s>=x;s--) dp[s]+=dp[s-x];
   }
   cout<<dp[S];
  }`
    }
  },
  {
    title: "Maximum Sum Increasing Subsequence",
    difficulty: "MEDIUM",
    tags: ["DP", "LIS", "Subsequence", "Optimization"],
    description: "Find the maximum possible sum of an increasing subsequence.",
    constraints: "1 <= n <= 2000",
    hints: "Like LIS but maximize sum.",
    editorial: "dp[i] = a[i] + max(dp[j]) where j<i and a[j]<a[i]",
    testCases: [
      { input: "5\n1 101 2 3 100", output: "106" }
    ],
    examples: {
      JAVASCRIPT: { input: "5\n1 101 2 3 100", output: "106", explanation: "1,2,3,100" },
      PYTHON: { input: "3\n3 2 1", output: "3", explanation: "Single max element" },
      CPP: { input: "4\n4 3 2 1", output: "4", explanation: "Single element" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0,n=d[i++]; const a=d.slice(i,i+n);
  const dp=a.slice();
  let ans=0;
  for(let i2=0;i2<n;i2++){
    for(let j=0;j<i2;j++){
      if(a[j]<a[i2]) dp[i2]=Math.max(dp[i2], dp[j]+a[i2]);
    }
    ans=Math.max(ans, dp[i2]);
  }
  console.log(ans);`,
      PYTHON: `n=int(input()); a=list(map(int,input().split()))
  dp=a[:]
  ans=0
  for i in range(n):
      for j in range(i):
          if a[j]<a[i]:
              dp[i]=max(dp[i], dp[j]+a[i])
      ans=max(ans, dp[i])
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   int n; cin>>n;
   vector<int>a(n); for(int&i:a)cin>>i;
   vector<int> dp=a;
   int ans=0;
   for(int i=0;i<n;i++){
     for(int j=0;j<i;j++) if(a[j]<a[i]) dp[i]=max(dp[i], dp[j]+a[i]);
     ans=max(ans, dp[i]);
   }
   cout<<ans;
  }`
    }
  },
  {
    title: "Boolean Parenthesization",
    difficulty: "HARD",
    tags: ["DP", "Interval-DP", "Expression", "Counting", "Partition-DP"],
    description: "Given a boolean expression, count the number of ways to parenthesize it so that it evaluates to true.",
    constraints: "1 <= length <= 200",
    hints: "Interval DP with true/false states.",
    editorial: "dp[l][r][isTrue]",
    testCases: [
      { input: "T|T&F", output: "1" }
    ],
    examples: {
      JAVASCRIPT: { input: "T|T&F", output: "1", explanation: "Only one way gives true" },
      PYTHON: { input: "T^F|T", output: "2", explanation: "Two ways" },
      CPP: { input: "T", output: "1", explanation: "Single literal" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  const n=s.length;
  const dp=Array.from({length:n},()=>Array.from({length:n},()=>[0,0]));
  for(let i=0;i<n;i+=2){
    dp[i][i][1]=s[i]==='T'?1:0;
    dp[i][i][0]=s[i]==='F'?1:0;
  }
  for(let len=3;len<=n;len+=2){
    for(let i=0;i+len-1<n;i++){
      let j=i+len-1;
      for(let k=i+1;k<j;k+=2){
        const op=s[k];
        const [lt,lf]=dp[i][k-1];
        const [rt,rf]=dp[k+1][j];
        if(op==='&'){
          dp[i][j][1]+=lt*rt;
          dp[i][j][0]+=lt*rf+lf*rt+lf*rf;
        }else if(op==='|'){
          dp[i][j][1]+=lt*rt+lt*rf+lf*rt;
          dp[i][j][0]+=lf*rf;
        }else{
          dp[i][j][1]+=lt*rf+lf*rt;
          dp[i][j][0]+=lt*rt+lf*rf;
        }
      }
    }
  }
  console.log(dp[0][n-1][1]);`,
      PYTHON: `s=input().strip()
  n=len(s)
  dp=[ [ [0,0] for _ in range(n) ] for __ in range(n) ]
  for i in range(0,n,2):
      dp[i][i][1]=1 if s[i]=='T' else 0
      dp[i][i][0]=1 if s[i]=='F' else 0
  for L in range(3,n+1,2):
      for i in range(0,n-L+1):
          j=i+L-1
          for k in range(i+1,j,2):
              op=s[k]
              lt,lf=dp[i][k-1]
              rt,rf=dp[k+1][j]
              if op=='&':
                  dp[i][j][1]+=lt*rt
                  dp[i][j][0]+=lt*rf+lf*rt+lf*rf
              elif op=='|':
                  dp[i][j][1]+=lt*rt+lt*rf+lf*rt
                  dp[i][j][0]+=lf*rf
              else:
                  dp[i][j][1]+=lt*rf+lf*rt
                  dp[i][j][0]+=lt*rt+lf*rf
  print(dp[0][n-1][1])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s; cin>>s;
   int n=s.size();
   vector<vector<array<long long,2>>> dp(n, vector<array<long long,2>>(n,{0,0}));
   for(int i=0;i<n;i+=2){
     dp[i][i][1]=(s[i]=='T');
     dp[i][i][0]=(s[i]=='F');
   }
   for(int L=3;L<=n;L+=2){
     for(int i=0;i+L-1<n;i++){
       int j=i+L-1;
       for(int k=i+1;k<j;k+=2){
         char op=s[k];
         auto [lt,lf]=dp[i][k-1];
         auto [rt,rf]=dp[k+1][j];
         if(op=='&'){
           dp[i][j][1]+=lt*rt;
           dp[i][j][0]+=lt*rf+lf*rt+lf*rf;
         }else if(op=='|'){
           dp[i][j][1]+=lt*rt+lt*rf+lf*rt;
           dp[i][j][0]+=lf*rf;
         }else{
           dp[i][j][1]+=lt*rf+lf*rt;
           dp[i][j][0]+=lt*rt+lf*rf;
         }
       }
     }
   }
   cout<<dp[0][n-1][1];
  }`
    }
  },
  {
    title: "Egg Dropping Problem",
    difficulty: "HARD",
    tags: ["DP", "Optimization", "Binary-Search", "Minimax", "Classic"],
    description: "Given k eggs and n floors, find minimum attempts needed in worst case to find the critical floor.",
    constraints: "1 <= k <= 100, 1 <= n <= 10000",
    hints: "DP with binary search optimization.",
    editorial: "dp[k][n] = 1 + min over x of max(dp[k-1][x-1], dp[k][n-x])",
    testCases: [
      { input: "2 10", output: "4" }
    ],
    examples: {
      JAVASCRIPT: { input: "2 10", output: "4", explanation: "Minimum attempts" },
      PYTHON: { input: "1 5", output: "5", explanation: "Linear search" },
      CPP: { input: "3 14", output: "4", explanation: "Classic result" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  let [k,n]=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let dp=Array.from({length:k+1},()=>Array(n+1).fill(0));
  for(let i=1;i<=n;i++) dp[1][i]=i;
  for(let e=2;e<=k;e++){
    for(let f=1;f<=n;f++){
      let l=1,r=f,ans=1e18;
      while(l<=r){
        let m=(l+r)>>1;
        let broken=dp[e-1][m-1];
        let not=dp[e][f-m];
        let cur=1+Math.max(broken,not);
        ans=Math.min(ans,cur);
        if(broken>not) r=m-1;
        else l=m+1;
      }
      dp[e][f]=ans;
    }
  }
  console.log(dp[k][n]);`,
      PYTHON: `k,n=map(int,input().split())
  dp=[[0]*(n+1) for _ in range(k+1)]
  for i in range(1,n+1): dp[1][i]=i
  for e in range(2,k+1):
      for f in range(1,n+1):
          l,r,ans=1,f,10**18
          while l<=r:
              m=(l+r)//2
              broken=dp[e-1][m-1]
              notb=dp[e][f-m]
              cur=1+max(broken,notb)
              ans=min(ans,cur)
              if broken>notb: r=m-1
              else: l=m+1
          dp[e][f]=ans
  print(dp[k][n])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   int k,n; cin>>k>>n;
   vector<vector<int>> dp(k+1, vector<int>(n+1,0));
   for(int i=1;i<=n;i++) dp[1][i]=i;
   for(int e=2;e<=k;e++){
     for(int f=1;f<=n;f++){
       int l=1,r=f,ans=1e9;
       while(l<=r){
         int m=(l+r)/2;
         int broken=dp[e-1][m-1];
         int notb=dp[e][f-m];
         int cur=1+max(broken,notb);
         ans=min(ans,cur);
         if(broken>notb) r=m-1;
         else l=m+1;
       }
       dp[e][f]=ans;
     }
   }
   cout<<dp[k][n];
  }`
    }
  },
  {
    title: "Longest Common Subsequence",
    difficulty: "MEDIUM",
    tags: ["DP", "2D-DP", "String", "Subsequence", "Classic"],
    description: "Given two strings, find the length of their longest common subsequence.",
    constraints: "1 <= length <= 2000",
    hints: "Compare characters and reduce problem.",
    editorial: "dp[i][j] = if a[i-1]==b[j-1] then 1+dp[i-1][j-1] else max(dp[i-1][j], dp[i][j-1])",
    testCases: [
      { input: "abcde ace", output: "3" },
      { input: "abc def", output: "0" }
    ],
    examples: {
      JAVASCRIPT: { input: "abcde ace", output: "3", explanation: "ace" },
      PYTHON: { input: "abc def", output: "0", explanation: "No common subsequence" },
      CPP: { input: "abc abc", output: "3", explanation: "Whole string" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/);
  const n=a.length,m=b.length;
  const dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=1;i<=n;i++){
    for(let j=1;j<=m;j++){
      if(a[i-1]===b[j-1]) dp[i][j]=1+dp[i-1][j-1];
      else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  console.log(dp[n][m]);`,
      PYTHON: `a,b=input().split()
  n,m=len(a),len(b)
  dp=[[0]*(m+1) for _ in range(n+1)]
  for i in range(1,n+1):
      for j in range(1,m+1):
          if a[i-1]==b[j-1]:
              dp[i][j]=1+dp[i-1][j-1]
          else:
              dp[i][j]=max(dp[i-1][j], dp[i][j-1])
  print(dp[n][m])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string a,b; cin>>a>>b;
   int n=a.size(), m=b.size();
   vector<vector<int>> dp(n+1, vector<int>(m+1,0));
   for(int i=1;i<=n;i++){
     for(int j=1;j<=m;j++){
       if(a[i-1]==b[j-1]) dp[i][j]=1+dp[i-1][j-1];
       else dp[i][j]=max(dp[i-1][j], dp[i][j-1]);
     }
   }
   cout<<dp[n][m];
  }`
    }
  },
  {
    title: "Minimum Path Sum in Grid",
    difficulty: "MEDIUM",
    tags: ["DP", "Grid-DP", "Path-Planning", "2D-DP", "Optimization"],
    description: "Given a grid, find the minimum sum path from top-left to bottom-right moving only right or down.",
    constraints: "1 <= n,m <= 200",
    hints: "Classic grid DP.",
    editorial: "dp[i][j] = grid[i][j] + min(top, left)",
    testCases: [
      { input: "3 3\n1 3 1\n1 5 1\n4 2 1", output: "7" }
    ],
    examples: {
      JAVASCRIPT: { input: "3 3\n1 3 1\n1 5 1\n4 2 1", output: "7", explanation: "1→3→1→1→1" },
      PYTHON: { input: "1 3\n1 2 3", output: "6", explanation: "Straight path" },
      CPP: { input: "1 1\n5", output: "5", explanation: "Single cell" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0; const n=d[i++], m=d[i++];
  const g=Array.from({length:n},()=>Array.from({length:m},()=>d[i++]));
  const dp=Array.from({length:n},()=>Array(m).fill(0));
  dp[0][0]=g[0][0];
  for(let i2=1;i2<n;i2++) dp[i2][0]=dp[i2-1][0]+g[i2][0];
  for(let j=1;j<m;j++) dp[0][j]=dp[0][j-1]+g[0][j];
  for(let i2=1;i2<n;i2++){
    for(let j=1;j<m;j++){
      dp[i2][j]=g[i2][j]+Math.min(dp[i2-1][j], dp[i2][j-1]);
    }
  }
  console.log(dp[n-1][m-1]);`,
      PYTHON: `data=list(map(int,input().split()))
  i=0; n=data[i]; m=data[i+1]; i=2
  g=[[0]*m for _ in range(n)]
  for r in range(n):
      for c in range(m):
          g[r][c]=data[i]; i+=1
  dp=[[0]*m for _ in range(n)]
  dp[0][0]=g[0][0]
  for r in range(1,n): dp[r][0]=dp[r-1][0]+g[r][0]
  for c in range(1,m): dp[0][c]=dp[0][c-1]+g[0][c]
  for r in range(1,n):
      for c in range(1,m):
          dp[r][c]=g[r][c]+min(dp[r-1][c], dp[r][c-1])
  print(dp[n-1][m-1])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   int n,m; cin>>n>>m;
   vector<vector<int>> g(n, vector<int>(m));
   for(int i=0;i<n;i++) for(int j=0;j<m;j++) cin>>g[i][j];
   vector<vector<int>> dp(n, vector<int>(m,0));
   dp[0][0]=g[0][0];
   for(int i=1;i<n;i++) dp[i][0]=dp[i-1][0]+g[i][0];
   for(int j=1;j<m;j++) dp[0][j]=dp[0][j-1]+g[0][j];
   for(int i=1;i<n;i++) for(int j=1;j<m;j++)
     dp[i][j]=g[i][j]+min(dp[i-1][j], dp[i][j-1]);
   cout<<dp[n-1][m-1];
  }`
    }
  },
  {
    title: "Target Sum",
    difficulty: "MEDIUM",
    tags: ["DP", "Subset", "Knapsack", "Transformation", "Counting"],
    description: "Given an array, assign + or - signs to reach target sum. Count the number of ways.",
    constraints: "1 <= n <= 100, sum <= 1000",
    hints: "Transform to subset sum counting.",
    editorial: "Convert to (sum+target)/2 subset count.",
    testCases: [
      { input: "5\n1 1 1 1 1\n3", output: "5" }
    ],
    examples: {
      JAVASCRIPT: { input: "5\n1 1 1 1 1\n3", output: "5", explanation: "5 ways" },
      PYTHON: { input: "3\n1 2 3\n0", output: "2", explanation: "+1-2+3 and -1+2-3" },
      CPP: { input: "1\n1\n1", output: "1", explanation: "+1" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0,n=d[i++]; const a=d.slice(i,i+n); i+=n; const T=d[i];
  const sum=a.reduce((x,y)=>x+y,0);
  if((sum+T)%2!==0 || Math.abs(T)>sum){ console.log(0); return; }
  const S=(sum+T)/2;
  const dp=Array(S+1).fill(0); dp[0]=1;
  for(const x of a){
    for(let s=S;s>=x;s--) dp[s]+=dp[s-x];
  }
  console.log(dp[S]);`,
      PYTHON: `n=int(input()); a=list(map(int,input().split())); T=int(input())
  s=sum(a)
  if (s+T)%2!=0 or abs(T)>s:
      print(0); exit()
  S=(s+T)//2
  dp=[0]*(S+1); dp[0]=1
  for x in a:
      for t in range(S, x-1, -1):
          dp[t]+=dp[t-x]
  print(dp[S])`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   int n; cin>>n;
   vector<int>a(n); for(int&i:a)cin>>i;
   int T; cin>>T;
   int s=accumulate(a.begin(),a.end(),0);
   if((s+T)%2!=0 || abs(T)>s){ cout<<0; return 0; }
   int S=(s+T)/2;
   vector<long long> dp(S+1,0); dp[0]=1;
   for(int x:a){
     for(int t=S;t>=x;t--) dp[t]+=dp[t-x];
   }
   cout<<dp[S];
  }`
    }
  },
  {
    title: "Longest Bitonic Subsequence",
    difficulty: "MEDIUM",
    tags: ["DP", "LIS", "LDS", "Subsequence", "Classic"],
    description: "Find the length of the longest subsequence which first increases then decreases.",
    constraints: "1 <= n <= 2000",
    hints: "Compute LIS and LDS.",
    editorial: "ans = max(LIS[i] + LDS[i] - 1)",
    testCases: [
      { input: "6\n1 11 2 10 4 5", output: "4" }
    ],
    examples: {
      JAVASCRIPT: { input: "6\n1 11 2 10 4 5", output: "4", explanation: "1 2 10 4" },
      PYTHON: { input: "5\n1 2 3 4 5", output: "5", explanation: "Pure increasing" },
      CPP: { input: "5\n5 4 3 2 1", output: "5", explanation: "Pure decreasing" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const fs=require("fs");
  const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
  let i=0,n=d[i++]; const a=d.slice(i,i+n);
  const lis=Array(n).fill(1), lds=Array(n).fill(1);
  for(let i2=0;i2<n;i2++)
   for(let j=0;j<i2;j++) if(a[j]<a[i2]) lis[i2]=Math.max(lis[i2], lis[j]+1);
  for(let i2=n-1;i2>=0;i2--)
   for(let j=n-1;j>i2;j--) if(a[j]<a[i2]) lds[i2]=Math.max(lds[i2], lds[j]+1);
  let ans=0;
  for(let i2=0;i2<n;i2++) ans=Math.max(ans, lis[i2]+lds[i2]-1);
  console.log(ans);`,
      PYTHON: `n=int(input()); a=list(map(int,input().split()))
  lis=[1]*n; lds=[1]*n
  for i in range(n):
      for j in range(i):
          if a[j]<a[i]:
              lis[i]=max(lis[i], lis[j]+1)
  for i in range(n-1,-1,-1):
      for j in range(n-1,i,-1):
          if a[j]<a[i]:
              lds[i]=max(lds[i], lds[j]+1)
  ans=0
  for i in range(n):
      ans=max(ans, lis[i]+lds[i]-1)
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   int n; cin>>n;
   vector<int>a(n); for(int&i:a)cin>>i;
   vector<int> lis(n,1), lds(n,1);
   for(int i=0;i<n;i++) for(int j=0;j<i;j++) if(a[j]<a[i]) lis[i]=max(lis[i], lis[j]+1);
   for(int i=n-1;i>=0;i--) for(int j=n-1;j>i;j--) if(a[j]<a[i]) lds[i]=max(lds[i], lds[j]+1);
   int ans=0;
   for(int i=0;i<n;i++) ans=max(ans, lis[i]+lds[i]-1);
   cout<<ans;
  }`
    }
  },
  {
    title: "Count Palindromic Substrings",
    difficulty: "MEDIUM",
    tags: ["DP", "Palindrome", "String", "Center-Expansion", "Counting"],
    description: "Count all palindromic substrings in a string.",
    constraints: "1 <= length <= 2000",
    hints: "Expand around center or DP.",
    editorial: "Check all centers.",
    testCases: [
      { input: "aaa", output: "6" }
    ],
    examples: {
      JAVASCRIPT: { input: "aaa", output: "6", explanation: "a,a,a,aa,aa,aaa" },
      PYTHON: { input: "abc", output: "3", explanation: "a,b,c" },
      CPP: { input: "aba", output: "4", explanation: "a,b,a,aba" }
    },
    codeSnippets: { JAVASCRIPT: "// stub", PYTHON: "# stub", CPP: "// stub" },
    referenceSolution: {
      JAVASCRIPT: `const s=require("fs").readFileSync(0,"utf8").trim();
  let n=s.length, ans=0;
  const expand=(l,r)=>{
    while(l>=0 && r<n && s[l]===s[r]){ ans++; l--; r++; }
  }
  for(let i=0;i<n;i++){
    expand(i,i);
    expand(i,i+1);
  }
  console.log(ans);`,
      PYTHON: `s=input().strip()
  n=len(s); ans=0
  def expand(l,r):
      global ans
      while l>=0 and r<n and s[l]==s[r]:
          ans+=1; l-=1; r+=1
  for i in range(n):
      expand(i,i); expand(i,i+1)
  print(ans)`,
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  int main(){
   string s; cin>>s;
   int n=s.size(), ans=0;
   auto expand=[&](int l,int r){
     while(l>=0 && r<n && s[l]==s[r]){ ans++; l--; r++; }
   };
   for(int i=0;i<n;i++){ expand(i,i); expand(i,i+1); }
   cout<<ans;
  }`
    }
  }
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  

  
  
  


  
  
  
  
]