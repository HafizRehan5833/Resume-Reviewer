import os, sys
# add project root to import path so we can import the real app
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from main import app