import sys
import os

print(f"Executable: {sys.executable}")
print(f"Python Version: {sys.version}")
print(f"Virtual Env: {os.environ.get('VIRTUAL_ENV', 'None')}")

if sys.executable.lower().endswith(".venv\\scripts\\python.exe"):
    print("\nSUCCESS: Using the correct virtual environment interpreter.")
else:
    print("\nFAILURE: Not using the expected virtual environment interpreter.")
