cd src/services && 
sed -i'' -e 's/BASE_URL: PROD/BASE_URL: QA/g' constant.js && 
rm constant.js-e  && 
cd ../.. && 
npx react-native run-android