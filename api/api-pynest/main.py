if __name__ == '__main__':
    import uvicorn
    uvicorn.run(
        'src.app_module:http_server',
        host="localhost",
        port=8000,
        reload=True
    )
    
