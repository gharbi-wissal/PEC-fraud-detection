#!/usr/bin/python
import pandas as pd
from datetime import datetime
import sys, getopt
from os import path


def func(inputfile, outputfile):
   try:
         all_data = pd.read_csv(inputfile)
         all_data['Nbr réclamations antérieures'] = [sum(all_data['Nom et Prénom Assuré /Raison Sociale'] == all_data['Nom et Prénom Assuré /Raison Sociale'][i]) for i in range(len(all_data))]

         all_data = all_data[pd.notnull(all_data['Date demande'])]

         all_data["Date Accident"]=all_data["Date Accident"].apply(lambda x: datetime.strftime(pd.to_datetime(x,dayfirst=True), "%m/%d/%Y"))
         all_data["Date demande"]=all_data["Date demande"].apply(lambda x: datetime.strftime(pd.to_datetime(x, format="%d/%m/%Y %H:%M"), "%m/%d/%Y"))

         all_data["Jour Accident"]= pd.DatetimeIndex(all_data['Date Accident']).day
         all_data["Mois Accident"]= pd.DatetimeIndex(all_data['Date Accident']).month
         all_data["Année Accident"]= pd.DatetimeIndex(all_data['Date Accident']).year

         all_data["Jour demande"]= pd.DatetimeIndex(all_data['Date demande']).day
         all_data["Mois demande"]= pd.DatetimeIndex(all_data['Date demande']).month
         all_data["Année demande"]= pd.DatetimeIndex(all_data['Date demande']).year

         all_data['Retard reclamation']= pd.DatetimeIndex(all_data['Date demande']) - pd.DatetimeIndex (all_data['Date Accident'])

         all_data['Retard reclamation']=(all_data['Retard reclamation']).apply(lambda x: x.days)

         indexNames = all_data[ (all_data['Retard reclamation'] > 30)].index
         all_data.drop(indexNames , inplace=True)

         all_data['Retard reclamation']=all_data['Retard reclamation'].abs()

         all_data = all_data.astype({"Point Choc": object})

         all_data["Point Choc"]=all_data["Point Choc"].str.replace("\r\n",",").replace("-","")

         all_data["Garantie impliquée"]=all_data["Garantie impliquée"].apply(lambda x : x.replace("<br/>","").replace("-",""))
         all_data["Marque"]=all_data["Marque"].apply(lambda x : x.replace("\t",""))

         all_data2=all_data[['Référence GA',
            "Compagnie d'assurance",
         'Mode de gestion',
         'Garantie impliquée',
         'Chargé réparation',
         'Marque',
         'Réparateur',
         'Expert',
         'Compagnie adverse',
         'Accord VR (Véhicule de remplacement)',
         'Agence',
         'Agent',
         'Cas de barème',
         'Chargé acceptation',
         'Code agence',
         'Etape Dossier',
         "Etat d'approbation",
         'Montant total devis',
         'Point Choc',
         'Position GA',
         'SST',
         'Nbr réclamations antérieures',
         'Jour Accident',
         'Mois Accident',
         'Jour demande',
         'Retard reclamation']]

         all_data2.to_csv(outputfile)
   except:
      print('Preparation failed !')

def check_exe(name):
    if name[-4:] in {'.csv'}: 
       return True
    else:
       return False


def main(argv):
   inputfile = input("Enter input CSV file name : ")
   outputfile = input("Enter output CSV file name : ")
   if (check_exe(inputfile) & check_exe(outputfile)):
      print ('Input file is :', inputfile)
      if (path.exists(inputfile)):
         print('Preparing file ...')
         func(inputfile,outputfile)
         print ('Output file is ready :', outputfile)
      else:
         print("File doesn't exist !")
   else:
      print ("File extension is not '.csv' ")   

if __name__ == "__main__":
   main(sys.argv[1:])
