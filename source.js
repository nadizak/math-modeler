source = [
  {
    "title": "Start Up Cost Model",
    "x_label": "Number of Acres",
    "y_label": "Cost",
    "x_range": [0, 2],
    "y_range": [0, 1500000],
    "x_scale": 0.25,
    "y_scale": 100000,
    "desc": "This graph looks at the start-up cost of an Aquaponics system.",
    "independent": {
      "name": "E",
      "desc": "Number of Acres you Start With"
    },
    "dependent": {
      "name": "y",
	  "icon": "dollar-sign",
      "desc": "Total Cost for the Start Up"
    },
    "models": [
      {
        "title": "Pennsylvania Start Up Cost",
        "model": "y = E*F + K*L + N + T*E",
        "desc": "Total cost for an Aquaponics system in PA. The model accounts for a number of different cost factors.",
        "color": "green",
        "variables": [
          {
            "name": "F",
            "initial": 5680, "min": 5600, "max": 6000,
            "style": "constant",
            "desc": "Cost per acre"
          },
          {
            "name": "K",
            "initial": 1200, "min": 1200, "max": 1700,
            "style": "slider",
            "desc": "Total Fish Bought Initially"
          },
          {
            "name": "L",
            "initial": 500, "min": 400, "max": 600,
            "style": "slider",
            "desc": "Cost of the Fish"
          },
          {
            "name": "N",
            "initial": 1440, "min": 1000, "max": 2000,
            "style": "slider",
            "desc": "Cost of the Crop"
          },
          {
            "name": "T",
            "initial": 161316, "min": 0, "max": 1000000,
            "style": "constant",
            "desc": "Cost of all the Machines on One Acre"
          }
        ]
      }
    ]
  },
  {
    "title": "Labour Efficiency for Aquaponics",
    "x_range": [30, 150],
    "y_range": [12000, 200000],
    "x_scale": 10,
    "y_scale": 20000,
    "desc": "This is the first graph. Below are two example models that will be plotted on the graph.",
    "dependent": {
      "name": "y",
      "icon": "dollar-sign",
      "desc": "Labour Cost"
    },
    "independent": {
      "name": "E",
      "desc": "Hours Worked"
    },
    "models": [
      {
        "title": "Pennsylvania",
        "desc": "Distribution and Labour Cost for Pennsylvania Aquaponics System.",
        "model": "y = W * (A*B*C + D*E)",
        "color": "blue",
        "variables": [
          {
            "name": "A",
            "initial": 0.2, "min": 0.2, "max": 0.45,
            "scale": 0.01,
            "style": "slider",
            "desc": "Average pay for Trucks. Dollars per Mile."
          },
          {
            "name": "B",
            "initial": 364, "min": 30, "max": 758,
            "scale": 5,
            "style": "slider",
            "desc": "Miles driven, round trip. Assuming you don't leave the state."
          },
          {
            "name": "C",
            "icon": "truck",
            "initial": 3, "min": 1, "max": 7,
            "scale": 1,
            "style": "constant",
            "desc": "Number of delivery trucks."
          },
          {
            "name": "D",
            "initial": 7.25, "min": 7.25, "max": 13,
            "scale": 0.25,
            "style": "slider",
            "desc": "Hourly Pay Rate."
          },
          {
            "name": "W",
            "initial": 52, "min": 50, "max": 53,
            "style": "constant",
            "desc": "Number of weeks per Year"
          }
        ]
      },
      {
        "title": "Hawaii",
        "desc": "Distribution and Labour Cost for Hawaii Aquaponics System.",
        "model": "y = W * (A*B*C + D*E)",
        "color": "red",
        "variables": [
          {
            "name": "A",
            "initial": 0.2, "min": 0.2, "max": 0.45,
            "scale": 0.01,
            "style": "slider",
            "desc": "Average pay for Trucks. Dollars per Mile."
          },
          {
            "name": "B",
            "initial": 107, "min": 30, "max": 244,
            "scale": 5,
            "style": "slider",
            "desc": "Miles driven, round trip. Assuming you don't leave the state."
          },
          {
            "name": "C",
            "icon": "truck",
            "initial": 3, "min": 1, "max": 7,
            "scale": 1,
            "style": "constant",
            "desc": "Number of delivery trucks."
          },
          {
            "name": "D",
            "initial": 10.10, "min": 10.10, "max": 15,
            "scale": 0.25,
            "style": "slider",
            "desc": "Hourly Pay Rate."
          },
          {
            "name": "W",
            "initial": 52, "min": 50, "max": 53,
            "style": "constant",
            "desc": "Number of weeks per Year"
          }
        ]
      }
    ]
  },
  {
    "title": "Net Income for Hawaii Aquaponics System",
    "x_label": "Number of Years",
    "y_label": "Total Income",
    "x_range": [0, 10],
    "y_range": [0, 300000],
    "x_scale": 1,
    "y_scale": 10000,
    "desc": "This graph looks at the start-up cost of an Aquaponics system.",
    "independent": {
      "name": "NumYears",
      "desc": "Number of Years Passed"
    },
    "dependent": {
      "name": "y",
	  "icon": "dollar-sign",
      "desc": "Total Income"
    },
    "models": [
      {
        "title": "Net Income for Hawaii Aquaponics System",
        "model": "y = (GrossIncome - OperationCost - Depreciation) * (1 - IncomeTaxRate) * NumYears",
        "desc": "",
        "color": "green",
        "variables": [
          {
            "name": "GrossIncome",
            "initial": 98012, "min": 75000, "max": 120000, "scale": 1000,
            "style": "slider",
            "desc": "How much money the system made over the course of one year."
          },
          {
            "name": "OperationCost",
            "initial": 66183, "min": 5600, "max": 60999900,
            "style": "constant",
            "desc": "Cost to run the system for a year."
          },
          {
            "name": "Depreciation",
            "initial": 6984, "min": 5600, "max": 999999,
            "style": "constant",
            "desc": "The decrease in the value of our system over time."
          },
          {
            "name": "IncomeTaxRate",
            "initial": 0.3, "min": 0.18, "max": 0.3, "scale": 0.01,
            "style": "slide",
            "desc": "Percentage taken out of our profits for taxes."
          }
        ]
      }
    ]
  },
  {
    "title": "Profit for an Aquaponics System",
    "x_label": "Number of Years",
    "y_label": "Total Income",
    "x_range": [0, 10],
    "y_range": [-2000000, 1000000],
    "x_scale": 1,
    "y_scale": 100000,
    "desc": "This graph looks at the start-up cost of an Aquaponics system.",
    "independent": {
      "name": "Time",
      "desc": "Number of Years Passed"
    },
    "dependent": {
      "name": "y",
      "icon": "dollar-sign",
      "desc": "Total Income"
    },
    "models": [
      {
        "title": "Pennsylvania Profit",
        "model": "y = Time * ((Revenue*toFullAcre*acreCount) - ((opr + (52*(3*A*B + D*E)))*toFullAcre*acreCount)) * (1 - incomeTax) - (invest*toFullAcre*acreCount)",
        "desc": "",
        "color": "teal",
        "variables": [
          {
            "name": "Revenue",
            "initial": 0,
            "style": "list",
            "list": [
              ["Lettuce and Tilapia", 96474.72],
              ["Spinach and Tilapia", 145927.96],
              ["Peppers and Tilapia", 92486.44],
              ["Green Beans and Tilapia", 34988.76]
            ],
            "desc": "Total Average Revenue Based on Vegetable Grown."
          },
          {
            "name": "toFullAcre",
            "initial": 3.544, "min": 0, "max": 10,
            "style": "constant",
            "desc": "Amount of Farms that Fit in an Acre."
          },
          {
            "name": "acreCount",
            "initial": 3, "min": 1, "max": 10,
            "style": "slider",
            "desc": "How many acres you're using."
          },
          {
            "name": "opr",
            "initial": 19531, "min": 0, "max": 200000,
            "style": "constant",
            "desc": "Operational Costs in PA excluding labor."
          },
          {
            "name": "A",
            "initial": 0.2, "min": 0.2, "max": 0.45,
            "scale": 0.01,
            "style": "slider",
            "desc": "Average pay for Trucks. Dollars per Mile."
          },
          {
            "name": "B",
            "initial": 107, "min": 30, "max": 244,
            "scale": 5,
            "style": "slider",
            "desc": "Miles driven, round trip. Assuming you don't leave the state."
          },
          {
            "name": "D",
            "initial": 7.25, "min": 7.25, "max": 13,
            "scale": 0.25,
            "style": "slider",
            "desc": "Hourly Pay Rate."
          },
          {
            "name": "E",
            "initial": 40, "min": 30, "max": 150,
            "style": "constant",
            "desc": "Number of Hours Worked per Driver"
          },
          {
            "name": "incomeTax",
            "initial": 0.3, "min": 0.18, "max": 0.3, "scale": 0.01,
            "style": "slide",
            "desc": "Percentage taken out of our profits for taxes."
          },
          {
            "name": "invest",
            "initial": 161316, "min": 0, "max": 999999,
            "style": "constant",
            "desc": "Total Cost to Create an Aquaponics System."
          }
        ]
      },
      {
        "title": "Hawaii Profit",
        "model": "y = Time * ((Revenue*toFullAcre*acreCount) - ((opr + (52*(3*A*B + D*E)))*toFullAcre*acreCount)) * (1 - incomeTax) - (invest*toFullAcre*acreCount)",
        "desc": "",
        "color": "red",
        "variables": [
          {
            "name": "Revenue",
            "initial": 0,
            "style": "list",
            "list": [
              ["Lettuce and Tilapia", 98008.62],
              ["Spinach and Tilapia", 185178.16],
              ["Peppers and Tilapia", 68067.07],
              ["Green Beans and Tilapia", 56421.28]
            ],
            "desc": "Total Average Revenue Based on Vegetable Grown."
          },
          {
            "name": "toFullAcre",
            "initial": 3.544, "min": 0, "max": 10,
            "style": "constant",
            "desc": "Amount of Farms that Fit in an Acre."
          },
          {
            "name": "acreCount",
            "initial": 3, "min": 1, "max": 10,
            "style": "slider",
            "desc": "How many acres you're using."
          },
          {
            "name": "opr",
            "initial": 34341.00, "min": 0, "max": 200000,
            "style": "constant",
            "desc": "Operational Costs in HI excluding labor."
          },
          {
            "name": "A",
            "initial": 0.2, "min": 0.2, "max": 0.45,
            "scale": 0.01,
            "style": "slider",
            "desc": "Average pay for Trucks. Dollars per Mile."
          },
          {
            "name": "B",
            "initial": 107, "min": 30, "max": 244,
            "scale": 5,
            "style": "slider",
            "desc": "Miles driven, round trip. Assuming you don't leave the state."
          },
          {
            "name": "D",
            "initial": 10.10, "min": 10.10, "max": 15,
            "scale": 0.25,
            "style": "slider",
            "desc": "Hourly Pay Rate."
          },
          {
            "name": "E",
            "initial": 40, "min": 30, "max": 150,
            "style": "constant",
            "desc": "Number of Hours Worked per Driver"
          },
          {
            "name": "incomeTax",
            "initial": 0.3, "min": 0.18, "max": 0.3, "scale": 0.01,
            "style": "slide",
            "desc": "Percentage taken out of our profits for taxes."
          },
          {
            "name": "invest",
            "initial": 217078.00, "min": 0, "max": 999999,
            "style": "constant",
            "desc": "Total Cost to Create an Aquaponics System."
          }
        ]
      }
    ]
  }
]

$("#sourceCode").val(JSON.stringify(source,0,space=4));