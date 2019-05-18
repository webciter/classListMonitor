# classListMonitor
Monitor for changes in the ClassList of an Element

<h2>Events</h2>
<h3>ClassListChanged</h3>

You can capture changes to the class list with event.detail.oldClassList and compare with the current element values in 
element.classList. Only bind this Event to the elements that require monitoring.

<pre>
document.getElementById("element_to_monitor").addEventListener("ClassListChanged", function(event){
   console.log("newClassList", event.target.classList, "oldClassList", event.detail.oldClassList);
});
</pre>

<h2>Installation</h2>

<pre>
npm i dom_token_list-functions-class_list_monitor
</pre>

<pre>
window.classListMonitor = require('dom_token_list-functions-class_list_monitor');
</pre>

<h2>Destroy</h2>

You can stop the monitoring process with

<pre>
window.classListMonitor.destroy();
</pre>

