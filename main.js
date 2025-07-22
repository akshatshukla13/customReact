// ==== index.js ====

const rootElement = document.getElementById("root");

// State management for hooks
let currentComponent = null;
let hookIndex = 0;
let componentStates = new Map();
let currentRoot = null;
let renderFunction = null;

function createRoot(root) {
  currentRoot = root;
  return {
    render: (componentFn) => {
      renderFunction = () => {
        // Clear the root before re-rendering
        root.innerHTML = '';
        
        // Set up component context
        currentComponent = componentFn;
        hookIndex = 0;
        
        const elementTree = componentFn();
        const dom = renderElement(elementTree);
        root.appendChild(dom);
        
        // Reset component context
        currentComponent = null;
        hookIndex = 0;
      };
      
      // Initial render
      renderFunction();
    },
  };
}

function renderElement(node) {
  // If node is a string, it's a text node
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  // Create the element (e.g., "div", "h1")
  const element = document.createElement(node.type);

  // Handle props (attributes and event listeners)
  if (node.props) {
    Object.keys(node.props).forEach(key => {
      if (key === 'children') {
        // Handle children separately
        return;
      }
      
      if (key.startsWith('on') && typeof node.props[key] === 'function') {
        // Handle event listeners (onclick, onchange, etc.)
        const eventType = key.substring(2).toLowerCase();
        element.addEventListener(eventType, node.props[key]);
      } else {
        // Handle regular attributes
        element.setAttribute(key, node.props[key]);
      }
    });
  }

  // Handle children (could be string or array of objects)
  const children = node.props?.children || [];

  if (Array.isArray(children)) {
    children.forEach((child) => {
      element.appendChild(renderElement(child));
    });
  } else {
    element.appendChild(renderElement(children));
  }

  return element;
}

// useState Hook Implementation
function useState(initialValue) {
  if (!currentComponent) {
    throw new Error('useState can only be called inside a component');
  }
  
  // Create a unique key for this component and hook index
  const componentKey = currentComponent.toString();
  
  if (!componentStates.has(componentKey)) {
    componentStates.set(componentKey, []);
  }
  
  const componentHooks = componentStates.get(componentKey);
  const currentHookIndex = hookIndex++;
  
  // Initialize state if it doesn't exist
  if (componentHooks[currentHookIndex] === undefined) {
    componentHooks[currentHookIndex] = initialValue;
  }
  
  const currentValue = componentHooks[currentHookIndex];
  
  // State setter function
  const setValue = (newValue) => {
    // Support function updates like React
    const value = typeof newValue === 'function' ? newValue(componentHooks[currentHookIndex]) : newValue;
    
    // Only update if value actually changed
    if (componentHooks[currentHookIndex] !== value) {
      componentHooks[currentHookIndex] = value;
      
      // Trigger re-render
      if (renderFunction) {
        renderFunction();
      }
    }
  };
  
  return [currentValue, setValue];
}

// === Mounting it like ReactDOM.createRoot().render(<App />)
createRoot(rootElement).render(App);


// ==== app.js ====

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Hello, World!");
  
  return {
    type: "div",
    props: {
      children: [
        {
          type: "h1",
          props: {
            children: "Custom React with useState Hook"
          }
        },
        {
          type: "div",
          props: {
            children: [
              {
                type: "p",
                props: {
                  children: `Count: ${count}`
                }
              },
              {
                type: "button",
                props: {
                  children: "Increment",
                  onclick: () => setCount(count + 1)
                }
              },
              {
                type: "button",
                props: {
                  children: "Decrement",
                  onclick: () => setCount(count - 1)
                }
              }
            ]
          }
        },
        {
          type: "div",
          props: {
            children: [
              {
                type: "p",
                props: {
                  children: message
                }
              },
              {
                type: "button",
                props: {
                  children: "Change Message",
                  onclick: () => setMessage(message === "Hello, World!" ? "State updated!" : "Hello, World!")
                }
              }
            ]
          }
        }
      ]
    }
  };
}

