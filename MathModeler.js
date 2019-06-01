/*
  Todo List:
    Support for different variable styles (constant, drop down, ?)
    Transform the model display to a Wolfram Alpha processed math images
    Add support for units of variables
    desc for models
    Possibly add graph drawing speed up
      Have a buffer for each model on the graph
      Store points in a temporary variable that just recalls the point if not redrawing
    Do the line drawing as a spline instead on line joined points
*/

masterObj = [];
// The source loading function
$("#reload-source").click(function(e) {
  try {
    masterObj = $.parseJSON($("#sourceCode").val())
  }
  catch(err) {
    masterObj = [];
    alert("Source code failed to load. Make sure the source code is valid JSON.");
  }
  $.each(masterObj, createGraphTab);
});

function createGraphTab(graphN, graphObj) {
  // Now we create the actual tab's contents
  var $template = $("#g_");
  var $parent = $template.parent();
  var $tab = $template.clone();
  var $canvas = $tab.find("canvas");
  
  $tab.attr("id", "g" + graphN);
  $tab.attr("aria-labelledby", "g" + graphN + "-tab");
  $tab.attr("graphN", graphN);
  $tab.find(".graph-desc").html(graphObj.desc);
  
  if (graphObj.independent.icon) 
    $tab.find(".graph-x-name").html(`<i class="fas fa-${graphObj.independent.icon}"></i>`);
  else
    $tab.find(".graph-x-name").html(graphObj.independent.name);
  if (graphObj.dependent.icon)
    $tab.find(".graph-y-name").html(`<i class="fas fa-${graphObj.dependent.icon}"></i>`);
  else
    $tab.find(".graph-y-name").html(graphObj.dependent.name);
  $tab.find(".graph-x-desc").html(graphObj.independent.desc);
  $tab.find(".graph-y-desc").html(graphObj.dependent.desc);
  $tab.find(".graph-x-scale").html(graphObj.x_scale);
  $tab.find(".graph-y-scale").html(graphObj.y_scale);
  $tab.find(".graph-domain").html(`(${graphObj.x_range[0]}-${graphObj.x_range[1]})`);
  $tab.find(".graph-range").html(`(${graphObj.y_range[0]}-${graphObj.y_range[1]})`);
  
  $canvas.attr("id", "canvas" + graphN);
  $canvas.attr("x-min", graphObj.x_range[0]);
  $canvas.attr("x-max", graphObj.x_range[1]);
  $canvas.attr("y-min", graphObj.y_range[0]);
  $canvas.attr("y-max", graphObj.y_range[1]);
  $canvas.attr("x-scale", graphObj.x_scale);
  $canvas.attr("y-scale", graphObj.y_scale);
  
  if (graphN == 0) {
    $parent.find("div.tab-pane:not(:first-child)").remove();
  }
  $parent.append($tab);
  
  var $modelsDiv = $tab.find(".graph-models");
  $modelsDiv.html("");
  $tab.removeClass("template");
  $.each(graphObj.models, function(modelN, modelObj){
    createModelControls(modelN, modelObj, $modelsDiv);
    
    var $legendParent = $tab.find("div.graph-legend");
    var $modelLegend = $legendParent.find(".model_legend.template").clone();
    $modelLegend.find("span").html(modelObj.title);
    $modelLegend.removeClass("template");
    $modelLegend.css("color", modelObj.color);
    $legendParent.append($modelLegend);
  });
  
  // Replace the variables with icons is needed for the x and y
  $.each($tab.find("code.model-display"), function(i, e) {
    $.each([graphObj.dependent, graphObj.independent], function(i, varObj) {
      if (varObj.icon) {
        // Replace letters with icons
        var $e = $(e);
        var regex = new RegExp("(?<![\\d\\w])" + varObj.name + "(?![\\d\\w])","g");
        var icon = `<i class="fas fa-${varObj.icon}"></i>`;
        $e.html($e.html().replace(regex, icon));
      }
    });
  });
  
  // Create the link to the graph's tab
  createGraphLink(graphN, graphObj);
  updateGraph(graphN, $canvas);
  
  // Attach updateGraph to the sliders
  $tab.find("input").on("slide", function() {
    updateGraph(graphN, $canvas);
  });
}

function createGraphLink(graphN, graphObj) {
  var $template = $("#g_-tab").parent();
  var $parent = $template.parents(".nav-tabs");
  var $li = $template.clone();
  var $a = $li.find("a");
  
  // Adjust the attributes
  $a.attr("href", "#g" + graphN);
  $a.attr("id", "#g" + graphN + "-tab");
  $a.html(graphObj.title);
  $li.removeClass("template");
  
  // Remove old ones if first tab
  if (graphN == 0) {
    $parent.find("li:not(:first-child)").remove();
    $a.tab('show');
  }
  
  $parent.append($li);
  $li.show();
}

function createModelControls(modelN, modelObj, $parent) {
  var $template = $("#g_ div.graph-model-template");
  var $modelDiv = $template.clone();
  var $descParent = $modelDiv.find("div.model-vardescs");
  var modelDisplay = modelObj.model;
  
  $modelDiv.find(".model-title").html(modelObj.title).css("color", modelObj.color);
  $modelDiv.find(".model-desc").html(modelObj.desc || "");
  $modelDiv.attr("id", "m" + modelN);
  
  $parent.append($modelDiv);
  $descParent.empty();
  $.each(modelObj.variables, function(varN, varObj) {
    createVarSlider(varN, varObj, $descParent);
    
    if (varObj.icon) {
      // Replace letters with icons
      var regex = new RegExp("(?<![\\d\\w])" + varObj.name + "(?![\\d\\w])","g");
      var icon = `<i class="fas fa-${varObj.icon}"></i>`;
      modelDisplay = modelDisplay.replace(regex, icon);
    }
  });
  
  $modelDiv.find(".model-display").html(modelDisplay).css("color", modelObj.color);
}

function createVarSlider(i, varObj, $parent) {
  var $template = $("#g_ div.var-slider");
  var $sliderDiv = $template.clone();
  var $sliderInput = $sliderDiv.find("input");
  var $varInput = $sliderDiv.find("input");
  
  $sliderDiv.find(".var-desc").html(varObj.desc);
  $sliderDiv.find(".varname").html(varObj.name);
  
  if (varObj.style == "list") {
    $varInput.attr("data-slider-min", 0);
    $varInput.attr("data-slider-max", varObj.list.length-1);
  }
  else {
    $varInput.attr("data-slider-min", varObj.min);
    $varInput.attr("data-slider-max", varObj.max);
  }
  $varInput.attr("data-slider-value", varObj.initial);
  $varInput.attr("data-slider-step", varObj.scale || 1);
  
  if (varObj.icon) {
    $sliderDiv.find(".var-title").html(`<i class="fas fa-${varObj.icon}"></i>=`);
  }
  else {
    $sliderDiv.find(".var-title").html(varObj.name + "=");
  }
  
  var graphId = $parent.parents("div.tab-pane").attr("id");
  var modelId = $parent.parents("div.graph-model-template").attr("id");
  $varInput.attr("id", [graphId, modelId, "v" + i].join("-"));
  
  $sliderInput.slider();
  if (varObj.style == "constant") {
    $sliderDiv.find(".slider").hide();
  }
  $sliderInput.on("slide", function(e) {
    updateVarDisplay(e, varObj);
  });
  $sliderDiv.find(".slider").on("click",
      function(e){
        $(e.target).parents('h3').find('input').trigger("slide")});
  $sliderInput.trigger("slide");
  
  $parent.append($sliderDiv);
}

// Create sliders
function updateVarDisplay(slideEvt, varObj) {
  var $slideDiv = $(slideEvt.target).parents(".var-slider");
  var $tab = $slideDiv.parents(".tab-pane");
  value = $slideDiv.find("div.min-slider-handle").attr("aria-valuenow");
  if (varObj.style == "list") {
    $slideDiv.find("span.current").html("<br/>" +
            varObj["list"][value][0] + 
            "<br/>" + varObj["list"][value][1]);
  }
  else {
    $slideDiv.find("span.current").text(value);
  }
}

function updateModels(graphN) {
  var graphObj = masterObj[graphN];
  var indepVar = graphObj.independent.name;
  $.each(graphObj.models, function(modelN, modelObj) {
    var model = modelObj.model;
    
    model = model.substring(model.indexOf("=") + 1);
    $.each(modelObj.variables, function(varN, varObj) {
      var value = Number($(`#g${graphN}-m${modelN}-v${varN}`).val());
      if (varObj.style == "list") {
        value = varObj["list"][value][1];
      }
      var regex = new RegExp("(?<![\\d\\w])" + varObj.name + "(?![\\d\\w])", "g");
      model = model.replace(regex, value);
    });
    assignment = `modelObj.evaluate = function(${indepVar}){return ${model}};`;
    eval(assignment);
  });
}

// Upload the graph display
var AXIS_W = 1;
var LINE_W = 1;
var MARKER_W = 6;
function updateGraph(graphN, $graph) {
  var c = $graph[0];
  var ctx = c.getContext("2d");
  var x_min = Number($graph.attr("x-min"));
  var x_max = Number($graph.attr("x-max"));
  var y_min = Number($graph.attr("y-min"));
  var y_max = Number($graph.attr("y-max"));
  var x_scale = Number($graph.attr("x-scale"));
  var y_scale = Number($graph.attr("y-scale"));
  
  var axis_w = pw($graph, AXIS_W);
  var marker_w = pw($graph, MARKER_W);
  
  ctx.clearRect(0,0, c.width, c.height);
  ctx.beginPath();
  // Draw the graph Axes
  ctx.lineWidth = AXIS_W;
  ctx.strokeStyle = "black";
  var y_axis = Math.min(Math.max(0, y_min + axis_w[1]), y_max - axis_w[1])
  var x_axis = Math.min(Math.max(0, x_min + axis_w[0]), x_max - axis_w[0])
  ctx.moveTo(...tr($graph, x_min, y_axis));
  ctx.lineTo(...tr($graph, x_max, y_axis));
  ctx.stroke();
  ctx.moveTo(...tr($graph, x_axis, y_min));
  ctx.lineTo(...tr($graph, x_axis, y_max));
  ctx.stroke();
  
  // Draw the axis markers
  for(var x = x_min; x < x_max; x += x_scale) {
    ctx.strokeStyle = "#d9dcdf";
    ctx.beginPath();
    ctx.lineWidth = AXIS_W/5;
    ctx.moveTo(...tr($graph, x, y_min));
    ctx.lineTo(...tr($graph, x, y_max));
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = AXIS_W;
    ctx.moveTo(...tr($graph, x, y_axis + marker_w[1]));
    ctx.lineTo(...tr($graph, x, y_axis - marker_w[1]));
    ctx.stroke();
  }
  for(var y = y_min; y < y_max; y += y_scale) {
    ctx.strokeStyle = "#e9ecef";
    ctx.beginPath();
    ctx.lineWidth = AXIS_W/5;
    ctx.moveTo(...tr($graph, x_min, y));
    ctx.lineTo(...tr($graph, x_max, y));
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = AXIS_W;
    ctx.moveTo(...tr($graph, x_axis + marker_w[0], y));
    ctx.lineTo(...tr($graph, x_axis - marker_w[0], y));
    ctx.stroke();
  }
  
  // Now we actually plot the models
  updateModels(graphN);
  var pixWidth = pw($graph, 1)[0]; // Graph width of a pixel
  ctx.lineWidth = LINE_W;
  ctx.lineJoin = 'round';
  $.each(masterObj[graphN].models,
  function(modelN, modelObj) {
    ctx.beginPath();
    ctx.strokeStyle = modelObj.color;
    var y = 0;
    for(var x = x_min; x <= x_max; x += pixWidth) {
      var prevY = y;
      y = modelObj.evaluate(x);
      if (x == x_min || 
              ((Math.abs(prevY - y) / (y_max - y_min) > 0.05) &&
               (y <= y_min || y >= y_max)) ){
        ctx.moveTo(...tr($graph, x, y));
      }
      else {
        ctx.lineTo(...tr($graph, x, y));
        ctx.stroke();
      }
    }
  });
}

function tr($graph, x, y) {
  // Translates the x and y into equivalent position on the canvas
  var x_min = Number($graph.attr("x-min"));
  var x_max = Number($graph.attr("x-max"));
  var y_min = Number($graph.attr("y-min"));
  var y_max = Number($graph.attr("y-max"));
  var canvas_width = $graph.attr("width");
  var canvas_height = $graph.attr("height");
  
  canvas_x = ((x - x_min) / (x_max - x_min)) * canvas_width
  canvas_y = ((y_max - y) / (y_max - y_min)) * canvas_height
  
  return [canvas_x, canvas_y];
}

function pw($graph, pixels) {
  // Returns the graph size of a pixel in the canvas
  var x_min = Number($graph.attr("x-min"));
  var x_max = Number($graph.attr("x-max"));
  var y_min = Number($graph.attr("y-min"));
  var y_max = Number($graph.attr("y-max"));
  var canvas_width = $graph.attr("width");
  var canvas_height = $graph.attr("height");
  
  graph_x = (1 / canvas_width) * (x_max - x_min) * pixels;
  graph_y = (1 / canvas_width) * (y_max - y_min) * pixels;
  
  return [graph_x, graph_y];
}

// Load the initial source
$(document).ready(function(){
  $("#reload-source").click();
});

// Credits Button
$("#showCredits").click(function(e) {
  $(".modal").show();
  $(".overlay").show();
});

$("button[data-dismiss=modal]").click(function(e) {
  $(".modal").hide();
  $(".overlay").hide();
});