import pandas as pd
import sys

if len(sys.argv) < 2:
    print("join.py A.csv B.csv out.csv", file=sys.stderr)
    sys.exit(1)

# Read the CSV files into DataFrames
data1 = pd.read_csv(sys.argv[1])
data2 = pd.read_csv(sys.argv[2])

# Perform a left join on the common column
merged_data = pd.merge(data1, data2, on='question', how='left')

# Save the merged data to a new CSV file
merged_data.to_csv(sys.argv[3], index=False)