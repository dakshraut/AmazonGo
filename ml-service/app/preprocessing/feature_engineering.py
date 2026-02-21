# Feature engineering utilities
import pandas as pd

def create_transaction_matrix(df):
    basket = df.groupby(['transaction_id', 'product'])['product'] \
               .count().unstack().fillna(0)
    basket = basket.map(lambda x: 1 if x > 0 else 0)
    return basket
