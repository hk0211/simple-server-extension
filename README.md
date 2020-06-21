```
jupyter labextension install ./labextension
jupyter build

pip install -e ./serverextension
jupyter serverextension enable --py simple_server_extension
```
