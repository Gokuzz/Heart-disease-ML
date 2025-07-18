
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report,confusion_matrix



df = pd.read_csv('heart.csv')
print(df.head())

print(df.info())
print(df.describe())



print(df.isnull().sum())

print(df['target'].value_counts())


plt.figure(figsize=(12,8))
sns.heatmap(df.corr(),annot=True,cmap='coolwarm')
plt.title('Corelation heatmap')
plt.show()

X=df.drop('target',axis=1)
y=df['target']

X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42)
scaler=StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.fit_transform(X_test)

model = LogisticRegression()
model.fit(X_train_scaled,y_train)

y_pred=model.predict(X_test_scaled)
print(classification_report(y_test,y_pred))
print(confusion_matrix(y_test,y_pred))

