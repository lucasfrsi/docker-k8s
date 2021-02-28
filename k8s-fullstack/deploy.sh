docker build -t lucasfrsi/multi-client:latest -t lucasfrsi/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t lucasfrsi/multi-server:latest -t lucasfrsi/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t lucasfrsi/multi-worker:latest -t lucasfrsi/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push lucasfrsi/multi-client:latest
docker push lucasfrsi/multi-server:latest
docker push lucasfrsi/multi-worker:latest

docker push lucasfrsi/multi-client:$SHA
docker push lucasfrsi/multi-server:$SHA
docker push lucasfrsi/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=lucasfrsi/multi-server:$SHA
kubectl set image deployments/client-deployment client=lucasfrsi/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=lucasfrsi/multi-worker:$SHA