// simple topological sort (Kahn). returns array of node objects in order
export default function buildExecutionOrder(nodes, edges) {
    // nodes: [{ id, fn, label, ... }]
    // edges: [{ from, to }]
    const idToNode = new Map(nodes.map(n => [n.id, n]));
    const inDegree = {};
    const adj = {};
    nodes.forEach(n => { inDegree[n.id] = 0; adj[n.id] = []; });
    edges.forEach(e => {
      if (adj[e.from] && typeof inDegree[e.to] !== "undefined") {
        adj[e.from].push(e.to);
        inDegree[e.to] += 1;
      }
    });
  
    // Kahn queue
    const queue = [];
    for (const id of Object.keys(inDegree)) {
      if (inDegree[id] === 0) queue.push(id);
    }
  
    const orderIds = [];
    while (queue.length) {
      const id = queue.shift();
      orderIds.push(id);
      for (const nb of adj[id]) {
        inDegree[nb] -= 1;
        if (inDegree[nb] === 0) queue.push(nb);
      }
    }
  
    // If there was a cycle, some nodes won't be in orderIds. Append remaining nodes (deterministic).
    if (orderIds.length !== nodes.length) {
      nodes.forEach(n => {
        if (!orderIds.includes(n.id)) orderIds.push(n.id);
      });
    }
  
    // return node objects in that order
    return orderIds.map(id => idToNode.get(id)).filter(Boolean);
  }
  

