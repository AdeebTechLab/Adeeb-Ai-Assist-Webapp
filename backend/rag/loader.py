from pathlib import Path

from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    TextLoader,
)


def load_documents(folder_path):
    documents = []

    folder = Path(folder_path)

    for file in folder.iterdir():

        suffix = file.suffix.lower()

        if suffix == ".pdf":
            loader = PyPDFLoader(str(file))

        elif suffix == ".docx":
            loader = Docx2txtLoader(str(file))

        elif suffix == ".txt":
            loader = TextLoader(str(file), encoding="utf-8")

        else:
            continue

        docs = loader.load()

        documents.extend(docs)

    return documents